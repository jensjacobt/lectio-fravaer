/// <reference path="TableManipulator.ts" />

function main() {
  const tableId = '#s_m_Content_Content_fravaertbl'; 
  //@ts-ignore
  const tableManipulator = new TableManipulator($(tableId));

  // @ts-ignore
  chrome.runtime.sendMessage({action: 'getSettings'}, (s) => {
    if(!s.enabled)
      return;

    let yellowColor = 'rgb(255, 191, 0)';
    let redColor = 'rgb(255, 41, 55)';

    tableManipulator.reduceTable();
    tableManipulator.colorByAbsence(s.yellowThreshold, s.redThreshold, yellowColor, redColor);
    tableManipulator.roundPercentages(s.numberOfDecimals);
  });
}

main();
