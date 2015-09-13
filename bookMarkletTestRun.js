GroupingCriteria = function (ruleList){

    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight)));

    function calculateRule(rule, weight){
        return (rule.selectorText.split(',').length - 1) * weight;
    }
};

RareSelectorsCriteria = function (ruleList){

    this.pattern = /(\[{1}.*=.*\]{1})|(>|~|\+)/g;
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        if ((m = pattern.exec(rule.selectorText)) !== null)
            return m.length * weight;
        else
            return 0;
    }
};

SimplifiedPropertiesCriteria = function (ruleList){
    this.pattern = /(\w*:){1}(\w*,)+(;)/g;
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3.2;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        if ((m = pattern.exec(rule.selectorText)) !== null)
            return m.length * weight;
        else
            return 0;
    }
};

SelectorSizeCriteria = function (ruleList){
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight)));

    function calculateRule(rule, weight) {
        if (rule.selectorText.length > 20)
            return weight;
        else
            return 0;
    }
};

PseudoElementsCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;
    this.pattern = /(?!:not)(:\w+)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        if ((m = pattern.exec(rule.selectorText)) !== null)
            return m.length * weight;
        else
            return 0;
    }
};

AtRulesCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 2.8;
    this.pattern = /(?!@media)(@\w+)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        if ((m = pattern.exec(rule.selectorText)) !== null)
            return m.length * weight;
        else
            return 0;
    }
};

MediaQueriesCriteria = function (ruleList) {
  this.rules = Array.from(ruleList).filter((element) => element.type == 1);
  this.weight = 3.8;
  this.pattern = /(@media)/g;

  this.resultList = this.rules.map((currentValue) =>
      new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

  function calculateRule(rule, weight, pattern){
      var count = 0;
      while ((m = pattern.exec(rule.selectorText)) !== null) {
          if (m.index === pattern.lastIndex) {
              count++;
              pattern.lastIndex++;
          }
      }
      return count*weight
  }
};

PrefixCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 4.2;
    this.pattern = /(-webkit-)|(-moz-)|(-ms-)|(-o-)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        if ((m = pattern.exec(rule.selectorText)) !== null)
            return m.length * weight;
        else
            return 0;
    }
};

NotSufixCriteria = function (ruleList) {
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3.8;
    this.pattern = /(:not)/g;

    this.resultList = this.rules.map((currentValue) =>
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));

    function calculateRule(rule, weight, pattern){
        if ((m = pattern.exec(rule.selectorText)) !== null)
            return m.length * weight;
        else
            return 0;
    }
};

SelectorComplexityCriteria = function (ruleList) {
    // body...
};

LocationSelectorCriteria = function (ruleList) {

};

StyleSheetLengthCriteria = function (ruleList) {
    // body...
};

var Result = function(cssRule, score){
    this.cssRule = cssRule;
    this.score = score;
    this.htmlMatches = () => this.cssRule.selectorText;
};

var myStyleSheet = function(styleSheet){
    this.styleSheet = styleSheet;
    this.criteriaList = [];
    this.criteriaList.push(styleSheet.cssRules ? new GroupingCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new RareSelectorsCriteria(styleSheet.cssRules):null);
};

() => {
    var arr = Array.from(document.styleSheets);

    var myStyleSheetList = arr.map((currentValue) => new myStyleSheet(currentValue));

    console.log(myStyleSheetList);
}();
