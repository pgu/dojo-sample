define([
  'dojo/dom',
  'dojo/on',
  'dojo/domReady!'
], function (dom, on) {

  var sendBtn = dom.byId('sendBtn'),
    storeJSBtn = dom.byId('storeJSBtn'),
    retrieveJSBtn = dom.byId('retrieveJSBtn')
    ;

  var self = this;
  self.items = [];

  function updateItems (items) {
    self.items = items;

    var node = dom.byId('items');
    node.innerHTML = items.reduce(function (accu, item) {
      return accu + '<li>' + item.text + ' <b>' + item.done + '</b>' + '</li>';
    }, '');
  }

  //
  // postMessage
  //

  on(sendBtn, 'click', function (evt) {
    var frame = dom.byId('ngframe');
    frame.contentWindow.postMessage({ type: 'sendDataToFrame', items: self.items }, '*');
  });

  function onMessage (event) {
    if (event.data.type === 'sendDataToContainer') {
      updateItems(event.data.items);
    }

  };

  window.addEventListener('message', onMessage, false);

  //
  // localStorage
  //

  on(storeJSBtn, 'click', function (evt) {
    window.localStorage.setItem('appItems', JSON.stringify(self.items));
  });

  on(retrieveJSBtn, 'click', function (evt) {
    var items = JSON.parse(window.localStorage.getItem('appItems'));
    updateItems(items);
  });

  var oldText = {};

  return {

    setText: function (id, text) {
      var node = dom.byId(id);
      oldText[ id ] = node.innerHTML;
      node.innerHTML = text;
    },

    restoreText: function (id) {
      var node = dom.byId(id);
      node.innerHTML = oldText[ id ];
      delete oldText[ id ];
    },

    updateItems: updateItems

  };
});