define([
  'dojo/dom',
  'dojo/domReady!'
], function (dom) {

  var watchers = {
    eventDojo: { callbacks: [] },
    eventNG: { callbacks: [] }
  };

  var Bridge = {

    onEventDojo: function (callback) {
      watchers.eventDojo.callbacks.push(callback);
    },

    sendEventDojo: function () {
      watchers.eventDojo.callbacks.forEach(function (callback) {
        callback();
      });
    },

    onEventNG: function (callback) {
      watchers.eventNG.callbacks.push(callback);
    },

    sendEventNG: function (msg) {
      watchers.eventNG.callbacks.forEach(function (callback) {
        callback(msg);
      });
    }

  };

  window.Bridge = Bridge;

  return Bridge;
});