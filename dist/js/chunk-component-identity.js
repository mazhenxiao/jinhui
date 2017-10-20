webpackJsonp([18],{

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(79);

var _toolsIndexTab = __webpack_require__(618);

var _toolsIndexTab2 = _interopRequireDefault(_toolsIndexTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*项目身份证  */
//兼容ie


//标签
__webpack_require__(647);

var identity = function (_React$Component) {
    _inherits(identity, _React$Component);

    function identity(arg) {
        _classCallCheck(this, identity);

        return _possibleConstructorReturn(this, (identity.__proto__ || Object.getPrototypeOf(identity)).call(this, arg));
    }

    _createClass(identity, [{
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.bind_combobox();
            //  toolsTab.bindTab(this.props);//绑定头部标签
        }
    }, {
        key: "addTodo",
        value: function addTodo(text) {}
    }, {
        key: "bind_combobox",
        value: function bind_combobox() {
            var box = $("#comboBoxCRMProjectState");
            box.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "筹备", value: "0" }, { label: "在售（在建）", value: "1" }, { label: "竣备", value: "2" }, { label: "入住", value: "3" }, { label: "结案", value: "4" }]
            });
            var PeojectDev = $("#comboboxPeojectDev");
            PeojectDev.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "单独开发", value: "0" }, { label: "合作开发-派经理", value: "1" }, { label: "合作开发-不派经理竣备", value: "2" }]
            });
            var property = $("#comboboxisSlefProperty");
            property.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "是", value: "0" }, { label: "否", value: "1" }]
            });
            var operate = $("#operate");
            operate.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "部分操盘", value: "0" }, { label: "非操盘", value: "1" }]
            });
            var inproperty = $("#includProperty");
            inproperty.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "是", value: "0" }, { label: "否", value: "1" }]
            });
            var account = $("#account");
            account.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "单帐套", value: "0" }, { label: "多帐套", value: "1" }]
            });
            var projectType = $("#projectType");
            projectType.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                reaonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "开发项目", value: "0" }, { label: "收并购已完工", value: "1" }, { label: "一级开发及其他", value: "2" }, { label: "升级改造项目", value: "3" }, { label: "售转持", value: "4" }, { label: "外部租赁", value: "5" }]
            });
            var tax = $("#tax");
            tax.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "一般计税", value: "0" }, { label: "简易计税", value: "1" }]
            });
            var expresion = $("#expresion");
            expresion.combobox({
                valueField: "value",
                textField: "label",
                editable: false,
                readonly: true,
                data: [{ label: "请选择", value: "", "selected": true }, { label: "A并表项目", value: "0" }, { label: "B非并表项目", value: "1" }]
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_toolsIndexTab2.default, { parent: this.props }),
                _react2.default.createElement(
                    "article",
                    { className: "index-identity mgT20" },
                    _react2.default.createElement(
                        "section",
                        { className: "identity" },
                        _react2.default.createElement(
                            "header",
                            { className: "HeaderBar" },
                            _react2.default.createElement(
                                "h5",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    null,
                                    "\u9879\u76EE\u603B\u56FE"
                                ),
                                _react2.default.createElement(
                                    "i",
                                    { className: "red" },
                                    "(\u7EA2\u8272*\u53F7\u4E3A\u5FC5\u586B\u9879)"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "table",
                                { className: "formTable", width: "100%" },
                                _react2.default.createElement(
                                    "colgroup",
                                    null,
                                    _react2.default.createElement("col", { width: "110" }),
                                    _react2.default.createElement("col", { width: "" }),
                                    _react2.default.createElement("col", { width: "150" }),
                                    _react2.default.createElement("col", { width: "" }),
                                    _react2.default.createElement("col", { width: "140" }),
                                    _react2.default.createElement("col", { width: "" })
                                ),
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u9879\u76EE\u8EAB\u4EFD\u8BC1"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u571F\u5730\u83B7\u53D6\u65E5\u671F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputTextBoxTime boxSizing", id: "getTime", type: "text", value: "" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u9879\u76EE\u5730\u5740\uFF08\u533A\u4F4D\uFF09"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u6848\u540D"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "CRM\u9879\u76EE\u72B6\u6001"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "comboBoxCRMProjectState" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u9879\u76EE\u5F00\u53D1\u65B9\u5F0F\u65B9\u5F0F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "comboboxPeojectDev" })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u5206\u671F\u540D\u79F0"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u662F\u5426\u542B\u81EA\u6301\u96C6\u4E2D\u7269\u4E1A"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "comboboxisSlefProperty" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u64CD\u76D8\u65B9\u5F0F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "operate" })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u9879\u76EE\u540D\u79F0"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u662F\u5426\u542B\u81EA\u6301\u96C6\u4E2D\u7269\u4E1A"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "includProperty" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing" },
                                                "\u9879\u76EE\u516C\u53F8\u540D\u79F0"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u9879\u76EE\u8D1F\u8D23\u4EBA"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u8D26\u52A1\u5E10\u5957\u6A21\u5F0F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "account" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing" },
                                                "\u6295\u8D44\u516C\u53F8\u540D\u79F0"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing" },
                                                "\u9879\u76EE\u7C7B\u578B"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "projectType" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u9879\u76EE\u8BA1\u7A0E\u65B9\u5F0F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "tax" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing" },
                                                "\u6743\u76CA\u6BD4\u4F8B"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(
                                                "b",
                                                { className: "suffix" },
                                                "%"
                                            ),
                                            " ",
                                            _react2.default.createElement(
                                                "p",
                                                { className: "mgR20" },
                                                _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing ", type: "text", value: "" })
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u9879\u76EE\u5E76\u8868\u65B9\u5F0F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "expresion" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing" },
                                                "\u8EAB\u4EFD\u8BC1\u5EFA\u7ACB\u65E5\u671F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputTextBoxTime boxSizing", id: "establish", type: "text", value: "" })
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            _react2.default.createElement(
                                                "label",
                                                { className: "formTableLabel boxSizing redFont" },
                                                "\u8EAB\u4EFD\u8BC1\u66F4\u65B0\u65E5\u671F"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputTextBoxTime boxSizing", id: "upDate", type: "text", value: "" })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "section",
                        { className: "mgT20" },
                        _react2.default.createElement(
                            "header",
                            { className: "HeaderBar" },
                            _react2.default.createElement(
                                "h5",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    null,
                                    "\u9879\u76EE\u603B\u56FE"
                                ),
                                _react2.default.createElement(
                                    "i",
                                    { className: "red" },
                                    "(\u7EA2\u8272*\u53F7\u4E3A\u5FC5\u586B\u9879)"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "table",
                            { className: "formTable", width: "100%" },
                            _react2.default.createElement(
                                "colgroup",
                                null,
                                _react2.default.createElement("col", { width: "110" }),
                                _react2.default.createElement("col", { width: "" }),
                                _react2.default.createElement("col", { width: "150" }),
                                _react2.default.createElement("col", { width: "" }),
                                _react2.default.createElement("col", { width: "140" }),
                                _react2.default.createElement("col", { width: "" })
                            ),
                            _react2.default.createElement(
                                "tbody",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing redFont" },
                                            "\u9879\u76EE\u8EAB\u4EFD\u8BC1"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing redFont" },
                                            "\u571F\u5730\u83B7\u53D6\u65E5\u671F"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputTextBoxTime boxSizing", id: "getTime", type: "text", value: "" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing redFont" },
                                            "\u9879\u76EE\u5730\u5740\uFF08\u533A\u4F4D\uFF09"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox boxSizing", type: "text", value: "" })
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return identity;
}(_react2.default.Component);

exports.default = identity;

/***/ }),

/***/ 609:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(611);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 611:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(80);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(65);

__webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * 首页导航条
 * index  identity  supply  所需
 */


//兼容ie

var IndexTab = function (_React$Component) {
    _inherits(IndexTab, _React$Component);

    function IndexTab(arg) {
        _classCallCheck(this, IndexTab);

        var _this = _possibleConstructorReturn(this, (IndexTab.__proto__ || Object.getPrototypeOf(IndexTab)).call(this, arg));

        _this.bindTab();
        _this.state = {
            data: [{ "guid": "1", "text": "项目概览", "tap": "index" }, { "guid": "2", "text": "项目身份证", "tap": "identity" }, { "guid": "3", "text": "供货", "tap": "supply" }, { "guid": "4", "text": "签约与回款", "tap": "signPayment" }, { "guid": "5", "text": "计划", "tap": "plan" }, { "guid": "6", "text": "重点事项", "tap": "matter" }, { "guid": "7", "text": "关键指标", "tap": "keyPoint" }]
        };
        return _this;
    }

    _createClass(IndexTab, [{
        key: 'bindTab',
        value: function bindTab(prop) {
            $(".JH-Content").removeClass("CLASS_AGENTY");
            // ReactDOM.render(<ToolsTtab parent={prop}/>,document.querySelector("#React-tools-tab"));
        }
        /* 事件 */

    }, {
        key: 'Event_click',
        value: function Event_click(data, ev) {
            var el = $(ev.target);
            el.parent().find("li").removeClass("active");
            setTimeout(function () {
                el.addClass("active");
            });
            switch (data) {
                case "index":
                    iss.hashHistory.push("index", { "state": "001" });break;
                case "identity":
                    iss.hashHistory.push("identity", { "state": "002" });break;
                case "supply":
                    iss.hashHistory.push("supply", { "state": "002" });break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var th = this,
                current = this.props.parent.location.pathname;
            var th;
            var list = this.state.data.map(function (da, ind) {

                if (current.indexOf(da.tap) >= 0) {
                    return _react2.default.createElement(
                        'li',
                        { key: ind, className: 'J-List active', onClick: th.Event_click.bind(th, da.tap) },
                        da.text
                    );
                } else {
                    return _react2.default.createElement(
                        'li',
                        { key: ind, className: 'J-List', onClick: th.Event_click.bind(th, da.tap) },
                        da.text
                    );
                }
            });
            return _react2.default.createElement(
                'header',
                { className: 'JH-HeadTab' },
                _react2.default.createElement(
                    'ul',
                    { className: 'JH-HeadList' },
                    list
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'JH-RightFlot' },
                    _react2.default.createElement(
                        'a',
                        { className: 'btn-refish', href: 'javascript:;' },
                        '\u5237\u65B0'
                    )
                )
            );
        }
    }]);

    return IndexTab;
}(_react2.default.Component);

exports.default = IndexTab;

/***/ }),

/***/ 647:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(648);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(610)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./identity.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./identity.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(609)(undefined);
// imports


// module
exports.push([module.i, ".index-identity {\n  margin: 0;\n  padding: 0;\n}\n", ""]);

// exports


/***/ })

});