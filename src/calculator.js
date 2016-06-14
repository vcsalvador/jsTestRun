var GroupingCriteria = function (ruleList){
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight)));

    function calculateRule(rule, weight){
        return weight * Math.atan((rule.selectorText.split(',').length - 1)/20);
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};


var NestingCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var count = 0;
        var m = rule.selectorText.split(' ');
        for (var i = 0; i < m.length - 1; i++){
            if (m[i].indexOf(',','>','~','+') < 0)
                count++;
        }
        return  weight * Math.atan(count/20);

    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var RareSelectorsCriteria = function (ruleList){

    this.pattern = /(\[{1}.*=.*\]{1})|(>|~|\+)/g;
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.selectorText)
        if (m !== null)
            return (m.length) * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var SimplifiedPropertiesCriteria = function (ruleList){
    this.pattern = /\w+:\s?(\w+\s?)+;/g;
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3.2;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.cssText);
        if (m !== null)
            return m.length * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var SelectorSizeCriteria = function (ruleList){
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight)));

    function calculateRule(rule, weight) {
        if (rule.selectorText.length > 35)
            return weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var PseudoElementsCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;
    this.pattern = /(?!:not)(?!:.*-child)(::\w+)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.selectorText);
        if (m !== null)
            return m.length * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var AtRulesCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => [3,5,6,7,8,10,12,13].indexOf(element.type) > -1);
    this.weight = 2.8;
    this.pattern = /(?!@media)(@\w+)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.selectorText);
        if (m !== null)
            return m.length * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var MediaQueriesCriteria = function (ruleList) {
  this.rules = Array.from(ruleList).filter((element) => element.type == 4);
  this.weight = 3.8;
  this.pattern = /(@media)/g;

  this.resultList = this.rules.map((currentValue) =>
      new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.selectorText);
        if (m !== null)
            return m.length * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var PrefixCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 4.2;
    this.pattern = /(-webkit-)|(-moz-)|(-ms-)|(-o-)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.cssText);
        if (m !== null)
            return m.length * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var NotSufixCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3.8;
    this.pattern = /(:not)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.selectorText);
        if (m !== null)
            return m.length * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var SelectorComplexityCriteria = function (ruleList) {

    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;
    this.pattern = /(\s\+)|(\s~)|((\w*\[[a-zA-Z0-9\^=]*\]))/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.selectorText);
        if (m !== null)
            return Math.pow(weight, m.length);
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};

var LocationSelectorCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;
    this.pattern = /(\w:\w*(-\w*)*-child)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        var m = pattern.exec(rule.selectorText);
        if (m !== null)
            return m.length * weight;
        else
            return 0;
    }

    this.total = this.resultList.reduce((previousValue,currentValue) => {
        return previousValue + currentValue.score}, 0);
};


var Result = function(cssRule, score){
    this.cssRule = cssRule;
    this.score = score;
    this.htmlMatches = () => this.cssRule.selectorText;
};

var myStyleSheet = function(styleSheet){
    this.styleSheet = styleSheet;
    this.criteriaList = [];
    this.criteriaList.push(styleSheet.cssRules ? new RareSelectorsCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new GroupingCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new NestingCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new SimplifiedPropertiesCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new PseudoElementsCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new SelectorSizeCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new AtRulesCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new MediaQueriesCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new PrefixCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new NotSufixCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new SelectorComplexityCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new LocationSelectorCriteria(styleSheet.cssRules):null);

    this.finalScore = this.criteriaList.reduce((previousValue,currentValue) => {
        return previousValue + (currentValue ? currentValue.total: 0)}, 0);
};

(() => {
    function html(templateObject, ...substs) {
        const raw = templateObject.raw;

        let result = '';

        substs.forEach((subst, i) => {
            let lit = raw[i];

            if (Array.isArray(subst)) {
                subst = subst.join('');
            }

            result += lit;
            result += subst;
        });

        result += raw[raw.length-1]; // (A)

        return result;
    }

    const fileName = path => {
      return (path !== null) ? path.substr((''+path.lastIndexOf('/')) || 0) : null;
    };

    const criteria = [
      'Seletores com combinadores raros',
      'Agrupamento de seletores',
      'Seletores aninhados',
      'Propriedades abreviadas',
      'Pseudoelementos e pseudoclasses',
      'Seletores muito extensos',
      '<em>At-rules</em>',
      '<em>Media queries</em>',
      'Prefixos de navegadores',
      'Cláusula :not(...)',
      'Complexidade do seletor',
      'Seletores de localidade'
    ];
    const template = data => html`
      <span class='close' onclick='this.parentNode.className = undefined;'>x</span>
      <table>
        <thead>
          <tr>
            <th rowspan='2'>&nbsp;</th>
            ${data.styleSheets.map((ss, i) => html`
              <th>styleSheet ${i+1}</th>
              `)}
          </tr>
          <tr>
            ${data.styleSheets.map(ss => html`
              <th>${fileName(ss.styleSheet.href) || 'CSS embutido'}</th>
              `)}
          </tr>
        </thead>
        <tbody>
          ${criteria.map((c, i) => html`
            <tr>
              <td>${c}</td>
              ${data.styleSheets.map(ss => html`
                <td>${ss.criteriaList[i] ? ss.criteriaList[i].total.toFixed(2) : '-'}</td>
                `)}
            </tr>
            `)}
        </tbody>
        <tfoot>
          <tr>
            <td>Total:</td>
            ${data.styleSheets.map(ss => html`
              <td>${ss.finalScore ? ss.finalScore.toFixed(2) : '-'}</td>
              `)}
          </tr>
        </tfoot>
      </table>`;

    const templateCssRules = [`
      #css-mmc {
        position: fixed;
        top: 0.25em;
        right: 0.25em;
        z-index: 1000;
        border-radius: 0.25em;
        background-color: rgba(255,255,255,0.94);
        border: 1px solid silver;
        min-width: 310px;
        overflow: auto;
        transition: all 200ms ease-out;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-1em);
      }`,`
      #css-mmc.showing {
        opacity: 1;
        pointer-events: initial;
        transform: translateY(0);
      }`,`
      #css-mmc table {
        color: #333;
        font-size: 9px;
        font-weight: 300;
        font-family: calibri, sans-serif;
        width: 95%;
        margin: 0 auto;
      }`,`
      #css-mmc tbody > tr:nth-child(even) {
        background-color: rgba(0,0,0,0.15);
      }`,`
      #css-mmc tbody > tr:not(:last-child) {
        border-bottom: 1px solid silver;
      }`,`
      #css-mmc tfoot tr {
        color: white;
        background-color: #333;
        font-weight: bold;
      }`,`
      #css-mmc td,
      #css-mmc th {
        padding: 0.5em;
        text-align: center;
        vertical-align: middle;
        border-radius: initial;
      }`,`
      #css-mmc tbody td:first-of-type {
        text-align: right;
        font-weight: 400;
      }`,`
      #css-mmc tbody td:first-of-type,
      #css-mmc tfoot td:first-of-type {
        text-align: right;
      }`,`
      #css-mmc .close {
        position: absolute;
        top: 0;
        left: 0.5em;
        padding: 0.5em;
        font-size: 20px;
        color: red;
        cursor: pointer;
        border-radius: 0 0 4px 4px;
        background-color: rgba(255,0,0,0.1);
        line-height: 1em;
      }
    `];

    let stylesheetsWithMetrics = Array.from(document.styleSheets)
      .filter(sheet => !sheet.ownerNode || sheet.ownerNode.id !== 'css-mmc-style')
      .map(sheet => new myStyleSheet(sheet));

    // begin CONSOLE output
    // console.log(stylesheetsWithMetrics);

    // begin HTML output
    let resultEl = document.getElementById('css-mmc') || document.createElement('aside');
    resultEl.id = 'css-mmc';
    resultEl.innerHTML = template({
      styleSheets: stylesheetsWithMetrics
    });
    document.body.insertBefore(resultEl, document.body.children[0]);
    setTimeout(() => resultEl.classList.add('showing'),200);

    let newStyleEl = document.getElementById('css-mmc-style') || document.createElement('style');
    newStyleEl.id = 'css-mmc-style';
    document.head.appendChild(newStyleEl);
    templateCssRules.reverse().forEach(r => newStyleEl.sheet.insertRule(r, 0));
})();
