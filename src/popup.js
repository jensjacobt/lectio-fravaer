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

let formId = 'settingsForm';
let form = document.getElementById(formId);
let setButton = form.getElementsByTagName('button')[0];
let cancelButton = form.getElementsByTagName('button')[1];

let yellowSelect = new SelectElement('yellowThreshold');
let redSelect = new SelectElement('redThreshold');
let numberSelect = new SelectElement('numberOfDecimals');
let selectElements = [redSelect, yellowSelect, numberSelect];

chrome.runtime.sendMessage({action: 'getSettings'}, (response) => {
  let settings = response;
  selectElements.forEach((se) => {
    se.setValue(settings[se.id]);
  });
});

selectElements.forEach((se) => {
  se.element.addEventListener("change", updateSettings(se));
});

function updateSettings(se) {
  let offsetHandler;
  if(se.id == 'yellowThreshold')
    offsetHandler = increaseRed;
  else if(se.id == 'redThreshold')
    offsetHandler = decreaseYellow;
  else
    offsetHandler = function() { return; };

  return function() {
    offsetHandler();
  
    let settings = {};
    selectElements.forEach((se) => {
      settings[se.id] = se.getValue();
    });
  
    chrome.runtime.sendMessage({action: 'setSettings', settings: settings});
  }
}

function increaseRed() {
  if(redSelect.getValue() <= yellowSelect.getValue()) {
    redSelect.setValue(yellowSelect.getValue() + 1);
  }
}

function decreaseYellow() {
  if(redSelect.getValue() <= yellowSelect.getValue()) {
    yellowSelect.setValue(redSelect.getValue() - 1);
  }
}
