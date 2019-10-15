'use strict';

class SelectElement
{
  constructor(id) {
    this.id = id;
    this.element = document.getElementById(id);
  }

  getValue() {
    let rawValue = this.element.options[this.element.selectedIndex].value;
    return Number.parseInt(rawValue);
  }

  setValue(value) {
    value = value.toString();
    let foundValue = false;
    for (let i = 0; i < this.element.options.length; i++) {
      const option = this.element.options[i];
      if(option.value == value) {
        this.element.selectedIndex = i;
        foundValue = true;
        break;
      }
    }
    if (!foundValue)
      console.error(`Value of "${value}" not found in select element with id "${this.id}"`);
  }
}

let form = document.getElementById('settingsForm');
let enabledCheckbox = document.getElementById('enabled');

let yellowSelect = new SelectElement('yellowThreshold');
let redSelect = new SelectElement('redThreshold');
let numberSelect = new SelectElement('numberOfDecimals');
let selectElements = [redSelect, yellowSelect, numberSelect];

chrome.runtime.sendMessage({action: 'getSettings'}, (response) => {
  let settings = response;
  selectElements.forEach((se) => {
    se.setValue(settings[se.id]);
  });
  enabledCheckbox.checked = settings.enabled;
});

yellowSelect.element.addEventListener("change", updateFromYellow);
redSelect.element.addEventListener("change", updateFromRed);
numberSelect.element.addEventListener("change", updateSettings);
enabledCheckbox.addEventListener("change", updateSettings);

function updateSettings() {
  let settings = {};
  selectElements.forEach((se) => {
    settings[se.id] = se.getValue();
  });
  settings.enabled = enabledCheckbox.checked ? 1 : 0;

  chrome.runtime.sendMessage({action: 'setSettings', settings: settings});
}

function updateFromYellow() { // increase red
  if(redSelect.getValue() <= yellowSelect.getValue()) {
    redSelect.setValue(yellowSelect.getValue() + 1);
  }
  updateSettings();
}

function updateFromRed() { // decrease yellow
  if(redSelect.getValue() <= yellowSelect.getValue()) {
    yellowSelect.setValue(redSelect.getValue() - 1);
  }
  updateSettings();
}
