'use strict';

var _templateObject = _taggedTemplateLiteral(['\n      <span class=\'close\' onclick=\'this.parentNode.className = undefined;\'>x</span>\n      <table>\n        <thead>\n          <tr>\n            <th rowspan=\'2\'>&nbsp;</th>\n            ', '\n          </tr>\n          <tr>\n            ', '\n          </tr>\n        </thead>\n        <tbody>\n          ', '\n        </tbody>\n        <tfoot>\n          <tr>\n            <td>Total:</td>\n            ', '\n          </tr>\n        </tfoot>\n      </table>'], ['\n      <span class=\'close\' onclick=\'this.parentNode.className = undefined;\'>x</span>\n      <table>\n        <thead>\n          <tr>\n            <th rowspan=\'2\'>&nbsp;</th>\n            ', '\n          </tr>\n          <tr>\n            ', '\n          </tr>\n        </thead>\n        <tbody>\n          ', '\n        </tbody>\n        <tfoot>\n          <tr>\n            <td>Total:</td>\n            ', '\n          </tr>\n        </tfoot>\n      </table>']),
    _templateObject2 = _taggedTemplateLiteral(['\n              <th>styleSheet ', '</th>\n              '], ['\n              <th>styleSheet ', '</th>\n              ']),
    _templateObject3 = _taggedTemplateLiteral(['\n              <th>', '</th>\n              '], ['\n              <th>', '</th>\n              ']),
    _templateObject4 = _taggedTemplateLiteral(['\n            <tr>\n              <td>', '</td>\n              ', '\n            </tr>\n            '], ['\n            <tr>\n              <td>', '</td>\n              ', '\n            </tr>\n            ']),
    _templateObject5 = _taggedTemplateLiteral(['\n                <td>', '</td>\n                '], ['\n                <td>', '</td>\n                ']),
    _templateObject6 = _taggedTemplateLiteral(['\n              <td>', '</td>\n              '], ['\n              <td>', '</td>\n              ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GroupingCriteria = function GroupingCriteria(ruleList) {
    var _this = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 2.8;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this.weight));
    });

    function calculateRule(rule, weight) {
        return weight * Math.atan((rule.selectorText.split(',').length - 1) / 20);
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var NestingCriteria = function NestingCriteria(ruleList) {
    var _this2 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 2.8;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this2.weight, _this2.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var count = 0;
        var m = rule.selectorText.split(' ');
        for (var i = 0; i < m.length - 1; i++) {
            if (m[i].indexOf(',', '>', '~', '+') < 0) count++;
        }
        return weight * Math.atan(count / 20);
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var RareSelectorsCriteria = function RareSelectorsCriteria(ruleList) {
    var _this3 = this;

    this.pattern = /(\[{1}.*=.*\]{1})|(>|~|\+)/g;
    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 3;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this3.weight, _this3.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.selectorText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var SimplifiedPropertiesCriteria = function SimplifiedPropertiesCriteria(ruleList) {
    var _this4 = this;

    this.pattern = /\w+:\s?(\w+\s?)+;/g;
    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 3.2;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this4.weight, _this4.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.cssText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var SelectorSizeCriteria = function SelectorSizeCriteria(ruleList) {
    var _this5 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 3;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this5.weight));
    });

    function calculateRule(rule, weight) {
        if (rule.selectorText.length > 35) return weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var PseudoElementsCriteria = function PseudoElementsCriteria(ruleList) {
    var _this6 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 2.8;
    this.pattern = /(?!:not)(?!:.*-child)(::\w+)/g;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this6.weight, _this6.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.selectorText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var AtRulesCriteria = function AtRulesCriteria(ruleList) {
    var _this7 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return [3, 5, 6, 7, 8, 10, 12, 13].indexOf(element.type) > -1;
    });
    this.weight = 2.8;
    this.pattern = /(?!@media)(@\w+)/g;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this7.weight, _this7.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.selectorText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var MediaQueriesCriteria = function MediaQueriesCriteria(ruleList) {
    var _this8 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 4;
    });
    this.weight = 3.8;
    this.pattern = /(@media)/g;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this8.weight, _this8.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.selectorText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var PrefixCriteria = function PrefixCriteria(ruleList) {
    var _this9 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 4.2;
    this.pattern = /(-webkit-)|(-moz-)|(-ms-)|(-o-)/g;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this9.weight, _this9.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.cssText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var NotSufixCriteria = function NotSufixCriteria(ruleList) {
    var _this10 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 3.8;
    this.pattern = /(:not)/g;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this10.weight, _this10.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.selectorText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var SelectorComplexityCriteria = function SelectorComplexityCriteria(ruleList) {
    var _this11 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 2.8;
    this.pattern = /(\s\+)|(\s~)|((\w*\[[a-zA-Z0-9\^=]*\]))/g;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this11.weight, _this11.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.selectorText);
        if (m !== null) return Math.pow(weight, m.length);else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var LocationSelectorCriteria = function LocationSelectorCriteria(ruleList) {
    var _this12 = this;

    this.rules = Array.from(ruleList).filter(function (element) {
        return element.type == 1;
    });
    this.weight = 2.8;
    this.pattern = /(\w:\w*(-\w*)*-child)/g;

    this.resultList = this.rules.map(function (currentValue) {
        return new Result(currentValue, calculateRule(currentValue, _this12.weight, _this12.pattern));
    });

    function calculateRule(rule, weight, pattern) {
        var m = pattern.exec(rule.selectorText);
        if (m !== null) return m.length * weight;else return 0;
    }

    this.total = this.resultList.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.score;
    }, 0);
};

var Result = function Result(cssRule, score) {
    var _this13 = this;

    this.cssRule = cssRule;
    this.score = score;
    this.htmlMatches = function () {
        return _this13.cssRule.selectorText;
    };
};

var myStyleSheet = function myStyleSheet(styleSheet) {
    this.styleSheet = styleSheet;
    this.criteriaList = [];
    this.criteriaList.push(styleSheet.cssRules ? new RareSelectorsCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new GroupingCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new NestingCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new SimplifiedPropertiesCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new PseudoElementsCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new SelectorSizeCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new AtRulesCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new MediaQueriesCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new PrefixCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new NotSufixCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new SelectorComplexityCriteria(styleSheet.cssRules) : null);
    this.criteriaList.push(styleSheet.cssRules ? new LocationSelectorCriteria(styleSheet.cssRules) : null);

    this.finalScore = this.criteriaList.reduce(function (previousValue, currentValue) {
        return previousValue + (currentValue ? currentValue.total : 0);
    }, 0);
};

(function () {
    function html(templateObject) {
        var raw = templateObject.raw;

        var result = '';

        for (var _len = arguments.length, substs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            substs[_key - 1] = arguments[_key];
        }

        substs.forEach(function (subst, i) {
            var lit = raw[i];

            if (Array.isArray(subst)) {
                subst = subst.join('');
            }

            result += lit;
            result += subst;
        });

        result += raw[raw.length - 1]; // (A)

        return result;
    }

    var fileName = function fileName(path) {
        return path !== null ? path.substr('' + path.lastIndexOf('/') || 0) : null;
    };

    var criteria = ['Seletores com combinadores raros', 'Agrupamento de seletores', 'Seletores aninhados', 'Propriedades abreviadas', 'Pseudoelementos e pseudoclasses', 'Seletores muito extensos', '<em>At-rules</em>', '<em>Media queries</em>', 'Prefixos de navegadores', 'Cláusula :not(...)', 'Complexidade do seletor', 'Seletores de localidade'];
    var template = function template(data) {
        return html(_templateObject, data.styleSheets.map(function (ss, i) {
            return html(_templateObject2, i + 1);
        }), data.styleSheets.map(function (ss) {
            return html(_templateObject3, fileName(ss.styleSheet.href) || 'CSS embutido');
        }), criteria.map(function (c, i) {
            return html(_templateObject4, c, data.styleSheets.map(function (ss) {
                return html(_templateObject5, ss.criteriaList[i] ? ss.criteriaList[i].total.toFixed(2) : '-');
            }));
        }), data.styleSheets.map(function (ss) {
            return html(_templateObject6, ss.finalScore ? ss.finalScore.toFixed(2) : '-');
        }));
    };

    var templateCssRules = ['\n      #css-mmc {\n        position: fixed;\n        top: 0.25em;\n        right: 0.25em;\n        z-index: 1000;\n        border-radius: 0.25em;\n        background-color: rgba(255,255,255,0.94);\n        border: 1px solid silver;\n        min-width: 310px;\n        overflow: auto;\n        transition: all 200ms ease-out;\n        opacity: 0;\n        pointer-events: none;\n        transform: translateY(-1em);\n      }', '\n      #css-mmc.showing {\n        opacity: 1;\n        pointer-events: initial;\n        transform: translateY(0);\n      }', '\n      #css-mmc table {\n        color: #333;\n        font-size: 9px;\n        font-weight: 300;\n        font-family: calibri, sans-serif;\n        width: 95%;\n        margin: 0 auto;\n      }', '\n      #css-mmc tbody > tr:nth-child(even) {\n        background-color: rgba(0,0,0,0.15);\n      }', '\n      #css-mmc tbody > tr:not(:last-child) {\n        border-bottom: 1px solid silver;\n      }', '\n      #css-mmc tfoot tr {\n        color: white;\n        background-color: #333;\n        font-weight: bold;\n      }', '\n      #css-mmc td,\n      #css-mmc th {\n        padding: 0.5em;\n        text-align: center;\n        vertical-align: middle;\n        border-radius: initial;\n      }', '\n      #css-mmc tbody td:first-of-type {\n        text-align: right;\n        font-weight: 400;\n      }', '\n      #css-mmc tbody td:first-of-type,\n      #css-mmc tfoot td:first-of-type {\n        text-align: right;\n      }', '\n      #css-mmc .close {\n        position: absolute;\n        top: 0;\n        left: 0.5em;\n        padding: 0.5em;\n        font-size: 20px;\n        color: red;\n        cursor: pointer;\n        border-radius: 0 0 4px 4px;\n        background-color: rgba(255,0,0,0.1);\n        line-height: 1em;\n      }\n    '];

    var stylesheetsWithMetrics = Array.from(document.styleSheets).filter(function (sheet) {
        return !sheet.ownerNode || sheet.ownerNode.id !== 'css-mmc-style';
    }).map(function (sheet) {
        return new myStyleSheet(sheet);
    });

    // begin CONSOLE output
    // console.log(stylesheetsWithMetrics);

    // begin HTML output
    var resultEl = document.getElementById('css-mmc') || document.createElement('aside');
    resultEl.id = 'css-mmc';
    resultEl.innerHTML = template({
        styleSheets: stylesheetsWithMetrics
    });
    document.body.insertBefore(resultEl, document.body.children[0]);
    setTimeout(function () {
        return resultEl.classList.add('showing');
    }, 200);

    var newStyleEl = document.getElementById('css-mmc-style') || document.createElement('style');
    newStyleEl.id = 'css-mmc-style';
    document.head.appendChild(newStyleEl);
    templateCssRules.reverse().forEach(function (r) {
        return newStyleEl.sheet.insertRule(r, 0);
    });
})();