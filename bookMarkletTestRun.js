'use Strict'

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
    this.criteriaList.push(styleSheet.cssRules ? new GroupingCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new NestingCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new RareSelectorsCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new SimplifiedPropertiesCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new SelectorSizeCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new PseudoElementsCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new AtRulesCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new MediaQueriesCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new PrefixCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new NotSufixCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new LocationSelectorCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new SelectorComplexityCriteria(styleSheet.cssRules):null);
    
    this.finalScore = this.criteriaList.reduce((previousValue,currentValue) => {
        return previousValue + (currentValue ? currentValue.total: 0)}, 0);
};

(() => {
    
    var script = document.createElement('script');
    script.type = 'application/javascript;version=1.7';
    
    document.getElementsByTagName('head')[0].appendChild(script);
    
    var arr = Array.from(document.styleSheets);

    var myStyleSheetList = arr.map((currentValue) => new myStyleSheet(currentValue));
    console.log(myStyleSheetList);
})();