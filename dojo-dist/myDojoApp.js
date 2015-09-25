define([
  'dojo/dom',
  'dojo/on',
  'dojo/domReady!'
], function (dom, on) {

  var domains1 = [
    { text: 'Dojo', done: false },
    { text: 'AngularJS', done: false }
  ];

  var domains2 = [
    { text: 'localStorage', done: false },
    { text: 'postMessage', done: false }
  ];

  var domain1Btn = dom.byId('domain1Btn'),
    domain2Btn = dom.byId('domain2Btn'),
    storeJSBtn = dom.byId('storeJSBtn'),
    retrieveJSBtn = dom.byId('retrieveJSBtn')
    ;

  function updateDomains (key) {
    var domains = '2' === key ? domains2 : domains1;

    var list = domains.reduce(function (accu, domain) {
      return accu + '<li>' + domain.text + ' <b>' + domain.done + '</b>' + '</li>';
    }, '');

    var node = dom.byId('domains' + key);
    node.innerHTML = list;

    if ('1' === key) {
      var _node = dom.byId('_domains1');
      _node.innerHTML = list;
    }

  }

  //
  // postMessage
  //

  function sendDataToFrame (key, items) {
    var frame = dom.byId('ngframe');
    frame.contentWindow.postMessage({ type: 'sendDataToFrame', key: key, items: items }, '*');
  }

  on(domain1Btn, 'click', function (evt) {
    sendDataToFrame('1', domains1);
  });

  on(domain2Btn, 'click', function (evt) {
    sendDataToFrame('2', domains2);
  });

  function onMessage (event) {
    if (event.data.type === 'sendDataToContainer') {
      var key = event.data.key;
      var domains = event.data.items;

      if (key === '1') {
        domains1 = domains;
      } else if (key === '2') {
        domains2 = domains;
      } else {
        throw 'Unknown key: ' + key;
      }

      updateDomains(key);
    }

  };

  window.addEventListener('message', onMessage, false);

  //
  // localStorage
  //

  on(storeJSBtn, 'click', function (evt) {
    window.localStorage.setItem('js-items', JSON.stringify(domains1));
  });

  on(retrieveJSBtn, 'click', function (evt) {
    domains1 = JSON.parse(window.localStorage.getItem('js-items'));
    updateDomains('1');
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