var GroupingCriteria = function(ruleList){
    this.rules = Array.from(ruleList).filter(function(element){
        return element.type == 1;
    });
    this.weight = 1;
    this.resultList = [];
    this.calculateRule = function(rules){

    };
};

var Result = function(){
    this.cssRule;
    this.score;
    this.htmlMatches = function(){
        this.cssRule.selectorText
    }
};

var myStyleSheet = function(styleSheet){
    this.styleSheet = styleSheet;
    this.groupingCriteria = new GroupingCriteria(styleSheet.cssRules);

};

function(){
    var arr = Array.from(document.styleSheets);

    var styleList = arr.map(function(currentValue){
        return new myStyleSheet(currentValue);
    });

    console.log(styleList);
}();
