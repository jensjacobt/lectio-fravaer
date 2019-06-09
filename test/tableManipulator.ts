import { expect } from 'chai';
import { TableManipulator } from '../src';

declare namespace NodeJS {
  export interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    jQuery: JQueryStatic;
    htmlString: string;
  }
}

const $ = global.jQuery;
const tableId = '#s_m_Content_Content_fravaertbl';

describe('TableManipulator', () => {
  before(() => {
    document.body.innerHTML = 
      `
      <body><table><tr><td>Hi</td></tr></table></body>
      `
  });

  it('can be initialized', () => {
    const tm = new TableManipulator($('table'));
    const tmtype = typeof tm;
    expect( tmtype ).to.equal('object');
  });

  context('after reducing an absense table', () => {
    before(() => {
      document.body.innerHTML = global.htmlString;
      const tm = new TableManipulator($(tableId));
      tm.reduceTable();
    });

    after(() => {
      document.body.innerHTML = '';
    });


    context('the first row', () => {
      it('has 3 children', () => {
        expect( $(tableId).find('tr').get(0).children.length ).to.equal(3);
      });
      
      it('has correct colspans', () => {
        expect( $(tableId).find('tr').eq(0).find('th').eq(0).attr('colspan') ).to.equal('1');
        for(let i = 0; i < 2; i++) {
          expect( $(tableId).find('tr').eq(0).find('td').eq(i).attr('colspan') ).to.equal('2');
        }
      });
    });


    context('the second row', () => {
      it('has 2 children', () => {
        expect( $(tableId).find('tr').get(1).children.length ).to.equal(2);
      });
      it('has correct text', () => {
        for(let i = 0; i < 2; i++) {
          expect( $(tableId).find('tr').eq(1).find('th').get(i).textContent ).to.equal('Opgjort');
        }
      });
    });


    context('the third row', () => {
      it('has 4 children', () => {
        expect( $(tableId).find('tr').get(2).children.length ).to.equal(4);
      });

      it('has correct text', () => {
        expect( $(tableId).find('tr').eq(2).find('th').get(0).textContent ).to.equal('Procent');
        expect( $(tableId).find('tr').eq(2).find('th').get(1).textContent ).to.equal('Moduler');
        expect( $(tableId).find('tr').eq(2).find('th').get(2).textContent ).to.equal('Procent');
        expect( $(tableId).find('tr').eq(2).find('th').get(3).textContent ).to.equal('Elevtid');
      });
    });


    context('a data row (the 9th row of the table)', () => {
      it('has 5 children', () => {
        expect( $(tableId).find('tr').get(8).children.length ).to.equal(5);
      });

      it('has name in black', () => {
        const color = $(tableId).find('tr').eq(8)
                        .children().first()
                        .children().first().get(0).style.color;
        expect( color ).to.equal('black');
      });
      
      const arr: object = {
        1: 'Flemming Fleck',
        2: '6,99%',
        3: '35,99/515',
        4: '5,75%',
        5: '10/174'
      };
      const entries = Object.entries(arr);
      for(const entry of entries) {
        const colNumber = parseInt(entry[0]);
        const knownString = entry[1];
        it('has correct text in column ' + colNumber, () => {
          const text = $(tableId).find('tr').eq(8).find('td').get(colNumber - 1).textContent;
          expect( text ).to.equal(knownString);
        });
      }
    });


    context('rounds', () => {
      let tm: TableManipulator;
      beforeEach(() => {
        document.body.innerHTML = global.htmlString;
        tm = new TableManipulator($(tableId));
        tm.reduceTable();
      });

      it('to two decimals correctly', () => {
        tm.roundPercentages(2);
        const arr: object = {
          1: 'Flemming Fleck',
          2: '6,99%',
          3: '35,99/515',
          4: '5,75%',
          5: '10/174'
        };
        const entries = Object.entries(arr);
        for(const entry of entries) {
          const colNumber = parseInt(entry[0]);
          const knownString = entry[1];
          const text = $(tableId).find('tr').eq(8).find('td').get(colNumber - 1).textContent;
          expect( text ).to.equal(knownString);
        }
      });

      it('to one decimal correctly', () => {
        tm.roundPercentages(1);
        const arr: object = {
          1: 'Flemming Fleck',
          2: '7,0%',
          3: '35,99/515',
          4: '5,8%',
          5: '10/174'
        };
        const entries = Object.entries(arr);
        for(const entry of entries) {
          const colNumber = parseInt(entry[0]);
          const knownString = entry[1];
          const text = $(tableId).find('tr').eq(8).find('td').get(colNumber - 1).textContent;
          expect( text ).to.equal(knownString);
        }
      });

      it('to zero decimals correctly', () => {
        tm.roundPercentages();
        const arr: object = {
          1: 'Flemming Fleck',
          2: '7%',
          3: '35,99/515',
          4: '6%',
          5: '10/174'
        };
        const entries = Object.entries(arr);
        for(const entry of entries) {
          const colNumber = parseInt(entry[0]);
          const knownString = entry[1];
          const text = $(tableId).find('tr').eq(8).find('td').get(colNumber - 1).textContent;
          expect( text ).to.equal(knownString);
        }
      });

    });

    context('after coloring', () => {
      before(() => {
        document.body.innerHTML = global.htmlString;
        const tm = new TableManipulator($(tableId));
        tm.reduceTable();
        tm.colorByAbsence();
      });

      it('low absence rows are not colored', () => {
        expect($(tableId).find('tr').get(4).style.backgroundColor).to.equal('');
      });

      it('high absense rows are colored yellow', () => {
        expect($(tableId).find('tr').get(3).style.backgroundColor).to.equal('rgb(255, 191, 0)');
        expect($(tableId).find('tr').get(6).style.backgroundColor).to.equal('rgb(255, 191, 0)');
      });

      it('very high absense rows are colored red', () => {
        // console.log($(tableId).html());
        expect($(tableId).find('tr').get(9).style.backgroundColor).to.equal('rgb(255, 41, 55)');
        expect($(tableId).find('tr').get(10).style.backgroundColor).to.equal('rgb(255, 41, 55)');
      });
      
    });
  });


}); 
