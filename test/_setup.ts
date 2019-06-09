declare namespace NodeJS {
  export interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    jQuery: JQueryStatic;
    htmlString: string;
  }
}

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// Set window and document from jsdom
window = new JSDOM('<body></body>').window;
document = window.document;
global.window = window;
global.document = document;
global.jQuery = require('jquery');//(window, true);
// jQueryFactory(window);

global.htmlString = 
`
<table id="s_m_Content_Content_fravaertbl" class="ls-table-layout1">
    <tbody><tr align="center" style="font-weight:bold;">
      <th colspan="2" rowspan="3">Elev</th><td colspan="6">Almindeligt fravær</td><td colspan="6">Skriftligt fravær</td>
    </tr><tr>
      <th colspan="2">Periode</th><th colspan="2">Opgjort</th><th colspan="2">For året</th><th colspan="2">Periode</th><th colspan="2">Opgjort</th><th colspan="2">For året</th>
    </tr><tr>
      <th>Procent</th><th><span title="Moduler af 90 min.">Moduler</span></th><th>Procent</th><th><span title="Moduler af 90 min.">Moduler</span></th><th>Procent</th><th><span title="Moduler af 90 min.">Moduler</span></th><th>Procent</th><th>Elevtid</th><th>Procent</th><th>Elevtid</th><th>Procent</th><th>Elevtid</th>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Albert Aaberg</a></td><td align="right" valign="top">6,33%</td><td align="center" valign="top">33,5/529</td><td align="right" valign="top">10,33%</td><td align="center" valign="top">33,5/529</td><td align="right" valign="top">6,31%</td><td align="center" valign="top">33,5/531</td><td align="right" valign="top">3,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">3,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">3,45%</td><td align="center" valign="top">6/174</td>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Benny Brecht</a></td><td align="right" valign="top">4,41%</td><td align="center" valign="top">23,5/533</td><td align="right" valign="top">4,41%</td><td align="center" valign="top">23,5/533</td><td align="right" valign="top">4,39%</td><td align="center" valign="top">23,5/535</td><td align="right" valign="top">3,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">3,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">3,45%</td><td align="center" valign="top">6/174</td>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Carla Craft</a></td><td align="right" valign="top">8,80%</td><td align="center" valign="top">47/534</td><td align="right" valign="top">8,80%</td><td align="center" valign="top">47/534</td><td align="right" valign="top">8,77%</td><td align="center" valign="top">47/536</td><td align="right" valign="top">4,24%</td><td align="center" valign="top">7/165</td><td align="right" valign="top">4,24%</td><td align="center" valign="top">7/165</td><td align="right" valign="top">4,12%</td><td align="center" valign="top">7/170</td>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Darla Driven</a></td><td align="right" valign="top">7,99%</td><td align="center" valign="top">42,5/532</td><td align="right" valign="top">7,99%</td><td align="center" valign="top">42,5/532</td><td align="right" valign="top">7,96%</td><td align="center" valign="top">42,5/534</td><td align="right" valign="top">3,60%</td><td align="center" valign="top">6/166,6</td><td align="right" valign="top">9,60%</td><td align="center" valign="top">6/166,6</td><td align="right" valign="top">3,50%</td><td align="center" valign="top">6/171,6</td>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Engolf Egefod</a></td><td align="right" valign="top">10,85%</td><td align="center" valign="top">57,5/530</td><td align="right" valign="top">10,85%</td><td align="center" valign="top">57,5/530</td><td align="right" valign="top">10,79%</td><td align="center" valign="top">57,5/533</td><td align="right" valign="top">11,49%</td><td align="center" valign="top">20/174</td><td align="right" valign="top">11,49%</td><td align="center" valign="top">20/174</td><td align="right" valign="top">11,17%</td><td align="center" valign="top">20/179</td>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Flemming Fleck</a></td><td align="right" valign="top">6,99%</td><td align="center" valign="top">35,99/515</td><td align="right" valign="top">6,99%</td><td align="center" valign="top">35,99/515</td><td align="right" valign="top">6,96%</td><td align="center" valign="top">35,99/517</td><td align="right" valign="top">5,75%</td><td align="center" valign="top">10/174</td><td align="right" valign="top">5,75%</td><td align="center" valign="top">10/174</td><td align="right" valign="top">5,59%</td><td align="center" valign="top">10/179</td>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Georg Grav</a></td><td align="right" valign="top">16,27%</td><td align="center" valign="top">33,5/534</td><td align="right" valign="top">16,27%</td><td align="center" valign="top">33,5/534</td><td align="right" valign="top">6,24%</td><td align="center" valign="top">33,5/537</td><td align="right" valign="top">3,61%</td><td align="center" valign="top">6/166</td><td align="right" valign="top">3,61%</td><td align="center" valign="top">6/166</td><td align="right" valign="top">3,51%</td><td align="center" valign="top">6/171</td>
    </tr><tr>
      <td>
  <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Hugo Helmig</a></td><td align="right" valign="top">7,17%</td><td align="center" valign="top">37/516</td><td align="right" valign="top">7,17%</td><td align="center" valign="top">37/516</td><td align="right" valign="top">7,14%</td><td align="center" valign="top">37/518</td><td align="right" valign="top">3,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">23,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">3,45%</td><td align="center" valign="top">6/174</td>
    </tr>
  </tbody></table>
`;

// <tr>
//       <td>
//   <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Ingolf Ingerslev</a></td><td align="right" valign="top">4,86%</td><td align="center" valign="top">26/535</td><td align="right" valign="top">4,86%</td><td align="center" valign="top">26/535</td><td align="right" valign="top">4,84%</td><td align="center" valign="top">26/537</td><td align="right" valign="top">3,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">3,55%</td><td align="center" valign="top">6/169</td><td align="right" valign="top">3,45%</td><td align="center" valign="top">6/174</td>
//     </tr><tr>
//       <td>
//   <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Jonas Jensen</a></td><td align="right" valign="top">7,74%</td><td align="center" valign="top">41,5/536</td><td align="right" valign="top">7,74%</td><td align="center" valign="top">41,5/536</td><td align="right" valign="top">7,70%</td><td align="center" valign="top">41,5/539</td><td align="right" valign="top">5,85%</td><td align="center" valign="top">10/171</td><td align="right" valign="top">5,85%</td><td align="center" valign="top">10/171</td><td align="right" valign="top">5,68%</td><td align="center" valign="top">10/176</td>
//     </tr><tr>
//       <td>
//   <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Klaus Kiel</a></td><td align="right" valign="top">13,68%</td><td align="center" valign="top">72,5/530</td><td align="right" valign="top">13,68%</td><td align="center" valign="top">72,5/530</td><td align="right" valign="top">13,63%</td><td align="center" valign="top">72,5/532</td><td align="right" valign="top">14,12%</td><td align="center" valign="top">24/170</td><td align="right" valign="top">14,12%</td><td align="center" valign="top">24/170</td><td align="right" valign="top">13,71%</td><td align="center" valign="top">24/175</td>
//     </tr><tr>
//       <td>
//   <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Lene Litz</a></td><td align="right" valign="top">10,24%</td><td align="center" valign="top">55/537</td><td align="right" valign="top">10,24%</td><td align="center" valign="top">55/537</td><td align="right" valign="top">10,20%</td><td align="center" valign="top">55/539</td><td align="right" valign="top">3,72%</td><td align="center" valign="top">6/161,5</td><td align="right" valign="top">3,72%</td><td align="center" valign="top">6/161,5</td><td align="right" valign="top">3,60%</td><td align="center" valign="top">6/166,5</td>
//     </tr><tr>
//       <td>
//   <img src="/lectio/img/portrait.gif"></td><td valign="middle"><a>Mikkel Monrad</a></td><td align="right" valign="top">13,28%</td><td align="center" valign="top">69,6/524</td><td align="right" valign="top">13,28%</td><td align="center" valign="top">69,6/524</td><td align="right" valign="top">13,21%</td><td align="center" valign="top">69,6/527</td><td align="right" valign="top">6,83%</td><td align="center" valign="top">11/161</td><td align="right" valign="top">6,83%</td><td align="center" valign="top">11/161</td><td align="right" valign="top">6,63%</td><td align="center" valign="top">11/166</td>
//     </tr><tr>
//       <td valign="middle"></td><td valign="middle"><i><b>Total</b></i></td><td align="right" valign="top"><b>8,38%</b></td><td align="center" valign="top"><b>1.245,59/14.872</b></td><td align="right" valign="top"><b>8,38%</b></td><td align="center" valign="top"><b>1.245,59/14.872</b></td><td align="right" valign="top"><b>8,34%</b></td><td align="center" valign="top"><b>1.245,59/14.936</b></td><td align="right" valign="top"><b>5,58%</b></td><td align="center" valign="top"><b>263/4.717,1</b></td><td align="right" valign="top"><b>5,58%</b></td><td align="center" valign="top"><b>263/4.717,1</b></td><td align="right" valign="top"><b>5,41%</b></td><td align="center" valign="top"><b>263/4.861,1</b></td>
//     </tr>