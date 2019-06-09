/**
 * Manipulator of Lectio absense tables.
 */
export class TableManipulator {
  private readonly TypeHeaderNumber = 0;
  private readonly TimeHeaderNumber = 1;
  private readonly unitHeaderNumber = 2;
  private readonly unitHeaderCols = [11, 10, 7, 6, 5, 4, 1, 0]; // must be in reverse order
  private readonly dataCols = [13, 12, 9, 8, 7, 6, 3, 2, 0];    // must be in reverse order

  private tableRows: JQuery;
  private readonly yellowThreshold: number;
  private readonly redThreshold: number;

  constructor(
    table: JQuery, 
    yellowThreshold: number = 9, 
    redThreshold: number = 12
  ) {
    this.tableRows = table.find('tr');
    this.yellowThreshold = yellowThreshold;
    this.redThreshold = redThreshold;
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
  reduceTable(): void {
    this.reduceTypeHeader(); 
    this.reduceTimeHeader();
    this.reduceUnitHeader();
    this.reduceDataRowsAndTurnLinksBlack();
  }

  roundPercentages(numberOfDecimals: number = 0): void {
    const numDecimals: number = Math.round(numberOfDecimals);
    if(numDecimals > 1)
      return;
    const tds = this.tableRows
                    .filter(index => (index > this.unitHeaderNumber))
                    .find('td');
    tds.each(this.roundPercentageInCell(numDecimals));
  }

  private roundPercentageInCell(numDecimals: number): (index: number, element: HTMLElement) => void {
    return (i, td) => {
      let text: string = td.textContent;
      if (!text.includes('%'))
        return;
      td.textContent = this.roundPercentageNumber(text, numDecimals);
    };
  }

  private roundPercentageNumber(text: string, numDecimals: number) {
    text = text.substring(0, text.length - 1);
    text = text.replace(",", ".");
    text = Number.parseFloat(text).toFixed(numDecimals);
    text = text.replace(".", ",");
    text = text + "%";
    return text;
  }

  /**
   * Reduce the data rows of the table.
   * Make the link text of the table black.
   */
  private reduceDataRowsAndTurnLinksBlack() {
    const dataRows = this.tableRows.filter(index => (index > this.unitHeaderNumber));
    this.dataCols.forEach(col => {
      dataRows
        .find('td:eq(' + col + ')')
        .remove();
    });
    dataRows
      .find('a')
      .css('color', 'black');
  }

  /**
   * Reduce the third row of the table.
   */
  private reduceUnitHeader() {
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
  private reduceTimeHeader() {
    this.tableRows
      .eq(this.TimeHeaderNumber)
      .children()
      .filter((i, th) => !(th.textContent == 'Opgjort'))
      .remove();
  }

  /**
   * Reduce the first row of the table.
   */
  private reduceTypeHeader() {
    const headerRow: JQuery = this.tableRows.eq(this.TypeHeaderNumber);
    headerRow
      .find('th')
      .attr('colspan', '1')
      .attr('rowspan', '3');
    headerRow
      .find('td')
      .attr('colspan', '2');
  }
}