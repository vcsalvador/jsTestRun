GroupingCriteria = function(ruleList){
    
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 1;
    
    this.resultList = this.rules.map((currentValue) => 
        new Result(currentValue, calculateRule(currentValue, this.weight)));
    
    function calculateRule(rule, weight){
        return (rule.selectorText.split(',').length - 1) * weight;
    }
};

RareSelectorsCriteria = function(ruleList){
    
    this.pattern = /(\[{1}.*=.*\]{1})|(>|~|\+)/g;
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3;
    
    this.resultList = this.rules.map((currentValue) => 
        new Result(currentValue, calculateRule(currentValue, this.weight)));
    
    function calculateRule(rule, weight){
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

var Result = function(cssRule, score){
    this.cssRule;
    this.score;
    this.htmlMatches = () => this.cssRule.selectorText;
};

var myStyleSheet = function(styleSheet){
    this.styleSheet = styleSheet;
    this.criteriaList = [];
    this.criteriaList.push(styleSheet.cssRules ? new GroupingCriteria(styleSheet.cssRules):null);
    this.cirteriaList.push(styleSheet.cssRules ? new RareSelectorsCriteria(styleSheet.cssRules):null);
};

() => {
    var arr = Array.from(document.styleSheets);

    var myStyleSheetList = arr.map(function(currentValue){
        return new myStyleSheet(currentValue);
    });

    console.log(myStyleSheetList);
}();