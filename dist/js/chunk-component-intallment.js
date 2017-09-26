webpackJsonp([4],{

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(65);

__webpack_require__(77);

var _componentStagingInformation = __webpack_require__(592);

var _componentStagingInformation2 = _interopRequireDefault(_componentStagingInformation);

var _componentIndicators = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./component-indicators.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _componentIndicators2 = _interopRequireDefault(_componentIndicators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*分期  */
//兼容ie


var Intallment = function (_React$Component) {
    _inherits(Intallment, _React$Component);

    function Intallment(arg) {
        _classCallCheck(this, Intallment);

        var _this = _possibleConstructorReturn(this, (Intallment.__proto__ || Object.getPrototypeOf(Intallment)).call(this, arg));

        iss.hashHistory.listenBefore(function (local, next) {
            console.log(local);
        });
        console.log(_this.props.location);
        return _this;
    }

    _createClass(Intallment, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log(this.props.location);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "article",
                null,
                _react2.default.createElement(_componentStagingInformation2.default, null),
                _react2.default.createElement(_componentIndicators2.default, null)
            );
        }
    }]);

    return Intallment;
}(_react2.default.Component);

exports.default = Intallment;

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(65);

__webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*分期信息栏 */


//兼容ie
// import Abc from "xxx.js";

var StagingInformation = function (_React$Component) {
    _inherits(StagingInformation, _React$Component);

    function StagingInformation(arg) {
        _classCallCheck(this, StagingInformation);

        var _this = _possibleConstructorReturn(this, (StagingInformation.__proto__ || Object.getPrototypeOf(StagingInformation)).call(this, arg));

        iss.hashHistory.listenBefore(function (local, next) {
            console.log(local);
        });
        console.log(_this.props.location);
        return _this;
    }

    _createClass(StagingInformation, [{
        key: "componentWillUpdate",
        value: function componentWillUpdate() {
            console.log(this.props.location);
        }
    }, {
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
            var installmentState = $("#installmentState"); //分期状态
            installmentState.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "2017年首开项目", value: "0" }, { label: "2018年首开项目", value: "1" }, { label: "顺工项目", value: "2" }]
            });
            var selfSustaining = $("#selfSustaining"); //自持业态
            selfSustaining.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "无", value: "", "selected": true }, { label: "酒店", value: "0" }, { label: "写字楼", value: "1" }]
            });
            var tradersWay = $("#tradersWay"); //操盘方式
            tradersWay.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "完全操盘", value: "0" }, { label: "派总经理", value: "1" }, { label: "不派总经理", value: "2" }]
            });
            var tableManner = $("#tableManner"); //并表方式
            tableManner.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "A并表项目", value: "0" }, { label: "B非并表项目", value: "1" }]
            });
            var projectType = $("#projectType"); //项目类型
            projectType.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "全新开发", value: "0" }, { label: "升级改造项目", value: "1" }, { label: "其他", value: "2" }]
            });
            var taxManner = $("#taxManner"); //项目计税方式
            taxManner.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "一般计税", value: "0" }, { label: "简易计税", value: "1" }]
            });
            var controlStage = $("#controlStage"); //项目类型
            controlStage.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "启动版", value: "0" }, { label: "基准版", value: "1" }, { label: "调整板（第1次）", value: "2" }, { label: "调整版（第2次）", value: "3" }, { label: "调整版（第N次）", value: "4" }, { label: "完结版", value: "5" }]
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "article",
                { className: "staging-box" },
                _react2.default.createElement(
                    "h3",
                    { className: "boxGroupTit" },
                    _react2.default.createElement(
                        "p",
                        null,
                        _react2.default.createElement(
                            "span",
                            null,
                            "\u5206\u671F\u4FE1\u606F"
                        ),
                        _react2.default.createElement(
                            "i",
                            null,
                            "\uFF08*\u4E3A\u5FC5\u586B\u9879\uFF09"
                        )
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "functionButton" },
                        _react2.default.createElement(
                            "a",
                            { className: "saveIcon ", href: "#" },
                            "\u6682\u5B58"
                        ),
                        _react2.default.createElement(
                            "a",
                            { className: "approvalIcon", target: "_blank", href: "#" },
                            "\u53D1\u8D77\u5BA1\u6279"
                        )
                    )
                ),
                _react2.default.createElement(
                    "section",
                    { className: "staging-left boxSizing projectinFormation" },
                    _react2.default.createElement(
                        "table",
                        { className: "formTable", width: "100%" },
                        _react2.default.createElement(
                            "colgroup",
                            null,
                            _react2.default.createElement("col", { width: "150" }),
                            _react2.default.createElement("col", { width: "" }),
                            _react2.default.createElement("col", { width: "150" }),
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
                                        { className: "formTableLabel boxSizing" },
                                        "\u9879\u76EE\u540D\u79F0"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
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
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
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
                                        "\u5206\u671F\u6848\u540D"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u5206\u671F\u7F16\u7801"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
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
                                        "\u5206\u671F\u72B6\u6001"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "installmentState" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u81EA\u6301\u7269\u4E1A"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "selfSustaining" })
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
                                        "\u64CD\u76D8\u65B9\u5F0F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "tradersWay" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u9879\u76EE\u516C\u53F8\u540D\u79F0"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
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
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u6743\u76CA\u6BD4\u4F8B"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" }),
                                    _react2.default.createElement(
                                        "i",
                                        { className: "symbol" },
                                        "%"
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
                                        "\u5E76\u8868\u65B9\u5F0F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "tableManner" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u9879\u76EE\u7C7B\u578B"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "projectType" })
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
                                        "\u9879\u76EE\u8BA1\u7A0E\u65B9\u5F0F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "taxManner" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u5206\u671F\u521B\u5EFA\u65E5\u671F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
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
                                        "\u5206\u671F\u66F4\u65B0\u65E5\u671F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u8BA1\u5212\u7BA1\u63A7\u9636\u6BB5"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "controlStage" })
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
                                        "\u542F\u52A8\u5F00\u53D1\u65F6\u95F4"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u5206\u671F\u603B\u56FE"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "a",
                                        { className: "linkA", href: "#" },
                                        "\u4E0A\u4F20/\u7F16\u8F91\u5206\u671F\u603B\u56FE"
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "section",
                    { className: "staging-right boxSizing fieldLocation fl" },
                    _react2.default.createElement(
                        "div",
                        { id: "myCarousel", className: "carousel slide" },
                        _react2.default.createElement(
                            "div",
                            { className: "carousel-inner" },
                            _react2.default.createElement(
                                "div",
                                { className: "item active" },
                                _react2.default.createElement("iframe", { src: "" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "item" },
                                _react2.default.createElement("iframe", { src: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "a",
                            { className: "carousel-control left", href: "#myCarousel",
                                "data-slide": "prev" },
                            "\u2039"
                        ),
                        _react2.default.createElement(
                            "a",
                            { className: "carousel-control right", href: "#myCarousel",
                                "data-slide": "next" },
                            "\u203A"
                        )
                    )
                ),
                _react2.default.createElement("div", { className: "clear" })
            );
        }
    }]);

    return StagingInformation;
}(_react2.default.Component);

exports.default = StagingInformation;

/***/ })

});