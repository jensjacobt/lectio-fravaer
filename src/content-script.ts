/// <reference path="TableManipulator.ts" />

function main() {
  const tableId = '#s_m_Content_Content_fravaertbl';
  const tableManipulator = new TableManipulator($(tableId));

  let settings;
  // @ts-ignore
  chrome.runtime.sendMessage({action: 'getSettings'}, (response) => {
    settings = response;

    let yellowThreshold = settings.yellowThreshold;
    let redThreshold = settings.redThreshold;
    let numberOfDecimals = settings.numberOfDecimals;
    let yellowColor = 'rgb(255, 191, 0)';
    let redColor = 'rgb(255, 41, 55)';

    tableManipulator.reduceTable();
    tableManipulator.colorByAbsence(yellowThreshold, redThreshold, yellowColor, redColor);
    tableManipulator.roundPercentages(numberOfDecimals);
  });
}

main();


