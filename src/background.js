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

// Notice: enabled must be either 0 or 1 (not true or false)
chrome.runtime.onInstalled.addListener(function () {
  setSettings({yellowThreshold: 7, redThreshold: 12, numberOfDecimals: 1, enabled: 1});
});

function getSettings() {
  let yellowThreshold = getSetting('yellowThreshold');
  let redThreshold = getSetting('redThreshold');
  let numberOfDecimals = getSetting('numberOfDecimals');
  let enabled = getSetting('enabled');
  return {yellowThreshold, redThreshold, numberOfDecimals, enabled};
}

function getSetting(id) {
  return Number.parseInt(localStorage.getItem(id));
}

function setSettings(settings) {
  localStorage.setItem('yellowThreshold', settings.yellowThreshold);
  localStorage.setItem('redThreshold', settings.redThreshold);
  localStorage.setItem('numberOfDecimals', settings.numberOfDecimals);
  localStorage.setItem('enabled', settings.enabled);
}
