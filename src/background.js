'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'getSettings') {
      let settings = getSettings();
      sendResponse(settings);
    } else if (request.action == 'setSettings') {
      setSettings(request.settings);
    }
});

chrome.runtime.onInstalled.addListener(function () {
  setSettings({yellowThreshold: 7, redThreshold: 12, numberOfDecimals: 1});
});

function getSettings() {
  let yellowThreshold = Number.parseInt(localStorage.getItem('yellowThreshold'));
  let redThreshold = Number.parseInt(localStorage.getItem('redThreshold'));
  let numberOfDecimals = Number.parseInt(localStorage.getItem('numberOfDecimals'));
  let settings = {yellowThreshold: yellowThreshold, redThreshold: redThreshold, numberOfDecimals: numberOfDecimals};
  return settings;
}

function setSettings(settings) {
  localStorage.setItem('yellowThreshold', settings.yellowThreshold);
  localStorage.setItem('redThreshold', settings.redThreshold);
  localStorage.setItem('numberOfDecimals', settings.numberOfDecimals);
}
