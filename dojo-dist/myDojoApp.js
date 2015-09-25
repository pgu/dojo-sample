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
  self.domains = [];

  function updateDomains (domains) {
    self.domains = domains;

    var list = domains.reduce(function (accu, domain) {
      return accu + '<li>' + domain.text + ' <b>' + domain.done + '</b>' + '</li>';
    }, '');

    var node = dom.byId('domains');
    node.innerHTML = list;

    var _node = dom.byId('_domains');
    _node.innerHTML = list;
  }

  //
  // postMessage
  //

  on(sendBtn, 'click', function (evt) {
    var frame = dom.byId('ngframe');
    frame.contentWindow.postMessage({ type: 'sendDataToFrame', items: self.domains }, '*');
  });

  function onMessage (event) {
    if (event.data.type === 'sendDataToContainer') {
      updateDomains(event.data.items);
    }

  };

  window.addEventListener('message', onMessage, false);

  //
  // localStorage
  //

  on(storeJSBtn, 'click', function (evt) {
    window.localStorage.setItem('domainItems', JSON.stringify(self.domains));
  });

  on(retrieveJSBtn, 'click', function (evt) {
    var domains = JSON.parse(window.localStorage.getItem('domainItems'));
    updateDomains(domains);
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

    updateDomains: updateDomains

  };
});