/**
 * Manipulator of Lectio absense tables.
 */
class TableManipulator {
    constructor(table) {
        this.TypeHeaderNumber = 0;
        this.TimeHeaderNumber = 1;
        this.unitHeaderNumber = 2;
        this.unitHeaderCols = [11, 10, 7, 6, 5, 4, 1, 0]; // must be in reverse order
        this.dataCols = [13, 12, 9, 8, 7, 6, 3, 2, 0]; // must be in reverse order
        this.classAbsenseColumnNumber = 1;
        this.assignmentAbsenseColumnNumber = 3;
        this.tableRows = table.find('tr');
        this.dataRows = this.tableRows.filter(index => (index > this.unitHeaderNumber));
    }
    /**
     * Reduce the table to look like this (with names in black):
     *
     *   Elev | Almindeligt fravær | Skriftligt fravær           (TypeHeader)
     *                Opgjort      |      Opgjort                (TimeHeader)
     *           Procent | Moduler | Procent | Elevtid           (UnitHeader)
     *   Name |     ??%  |    ?/?? |    ??%  |    ?/??           (DataRow)
     *
     */
    reduceTable() {
        this.reduceTypeHeader();
        this.reduceTimeHeader();
        this.reduceUnitHeader();
        this.reduceDataRowsAndTurnLinksBlack();
    }
    roundPercentages(numberOfDecimals = 0) {
        numberOfDecimals = Math.round(numberOfDecimals);
        if (numberOfDecimals > 1)
            return;
        const tds = this.tableRows
            .filter(index => (index > this.unitHeaderNumber))
            .find('td');
        tds.each(this.roundPercentageInCell(numberOfDecimals));
    }
    colorByAbsence(yellowThreshold = 7, redThreshold = 12, yellowColor = 'rgb(255, 191, 0)', redColor = 'rgb(255, 41, 55)') {
        this.dataRows
            .filter((i, row) => (this.getMaxAbsense(row) >= yellowThreshold))
            .css('background-color', yellowColor);
        this.dataRows
            .filter((i, row) => (this.getMaxAbsense(row) >= redThreshold))
            .css('background-color', redColor);
    }
    getMaxAbsense(tr) {
        let classAbsense = this.getNumberFromCell(tr, this.classAbsenseColumnNumber);
        let assignmentAbsense = this.getNumberFromCell(tr, this.assignmentAbsenseColumnNumber);
        return Math.max(classAbsense, assignmentAbsense);
    }
    getNumberFromCell(tr, columnNumber) {
        let text = tr.children[columnNumber].textContent;
        text = text.substring(0, text.length - 1);
        text = text.replace(",", ".");
        return Number(text);
    }
    roundPercentageInCell(numDecimals) {
        return (i, td) => {
            let text = td.textContent;
            if (!text.includes('%'))
                return;
            td.textContent = this.roundPercentageNumber(text, numDecimals);
        };
    }
    roundPercentageNumber(numberText, numDecimals) {
        numberText = numberText.substring(0, numberText.length - 1);
        numberText = numberText.replace(",", ".");
        numberText = Number.parseFloat(numberText).toFixed(numDecimals);
        numberText = numberText.replace(".", ",");
        numberText = numberText + "%";
        return numberText;
    }
    /**
     * Reduce the data rows of the table.
     * Make the link text of the table black.
     */
    reduceDataRowsAndTurnLinksBlack() {
        this.dataCols.forEach(col => {
            this.dataRows
                .find('td:eq(' + col + ')')
                .remove();
        });
        this.dataRows
            .find('a')
            .css('color', 'black');
    }
    /**
     * Reduce the third row of the table.
     */
    reduceUnitHeader() {
        let thirdRow = this.tableRows.eq(this.unitHeaderNumber);
        this.unitHeaderCols.forEach(col => {
            thirdRow
                .find('th:eq(' + col + ')')
                .remove();
        });
    }
    /**
     * Reduce the second row of the table.
     */
    reduceTimeHeader() {
        this.tableRows
            .eq(this.TimeHeaderNumber)
            .children()
            .filter((i, th) => !(th.textContent === 'Opgjort'))
            .remove();
    }
    /**
     * Reduce the first row of the table.
     */
    reduceTypeHeader() {
        const headerRow = this.tableRows.eq(this.TypeHeaderNumber);
        headerRow
            .find('th')
            .attr('colspan', '1')
            .attr('rowspan', '3');
        headerRow
            .find('td')
            .attr('colspan', '2');
    }
}
/// <reference path="TableManipulator.ts" />
function main() {
    const tableId = '#s_m_Content_Content_fravaertbl';
    const tableManipulator = new TableManipulator($(tableId));
    let settings;
    // @ts-ignore
    chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
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
