const firstHeaderNumber = 0; 
const secondHeaderNumber = 1;
const thirdHeaderNumber = 2;
const dataCols = [13, 12, 9, 8, 7, 6, 3, 2, 0]; // must be in reverse order
const thirdHeaderCols = [11, 10, 7, 6, 5, 4, 1, 0]; // must be in reverse order

const table = $('#s_m_Content_Content_fravaertbl');
const tableRows = table.find('tr');

let numDecimals = 1;
let yellowThreshold = 9;
let redTreshold = 12;

tableRows
  .eq(firstHeaderNumber)
  .find('th')
  .attr('colspan', '1')
  .attr('rowspan', '3'); 
tableRows
  .eq(firstHeaderNumber)
  .find('td')
  .attr('colspan', '2'); 
tableRows
  .eq(secondHeaderNumber)
  .children()
  .filter((i, th) => !(th.textContent == 'Opgjort'))
  .remove();
let thirdRow = tableRows.eq(thirdHeaderNumber);
thirdHeaderCols.forEach(col => {
  thirdRow
    .find('th:eq(' + col + ')')
    .remove();
});
let dataRows = tableRows.filter(index => (index > thirdHeaderNumber));
dataCols.forEach(col => {
  dataRows
    .find('td:eq(' + col + ')')
    .remove();
});
dataRows
  .find('a')
  .css('color', 'black');

let tds = document.querySelectorAll(" td");

tds.forEach((td) => {
  let text = td.textContent;
  if (!text.includes('%')) {
    return;
  }
  text = text.substring(0, text.length - 1);
  text = text.replace(",",".");
  let number = parseFloat(text);
  number = number.toFixed(numDecimals);
  text = number.toString();
  text = text.replace(".", ",");
  text = text + "%"
  td.textContent = text;
});


const classAbsenseColumnNumber = 1;
const assignmentAbsenseColumnNumber = 3;

function getMaxAbsense(tr) {
  let classAbsense = getNumberFromCell(tr, classAbsenseColumnNumber);
  let assignmentAbsense = getNumberFromCell(tr, assignmentAbsenseColumnNumber);
  return Math.max(classAbsense, assignmentAbsense);
}

function getNumberFromCell(tr, colNumber) {
  let text = tr.children[colNumber].textContent;
  text = text.substring(0, text.length - 1);
  text = text.replace(",",".");
  let number = Number(text);
  return number;
}

//dataRows.css('background-color', '#D2222D');

dataRows
  .filter((i, row) => (getMaxAbsense(row) >= yellowThreshold))
  .css('background-color', '#FFBF00'); // yellow

dataRows
  .filter((i, row) => (getMaxAbsense(row) >= redTreshold))
  .css('background-color', '#FF2937'); // red
