webpackJsonp([3],{

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(24);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(76);

__webpack_require__(85);

var _toolsAgentyTab = __webpack_require__(587);

var _toolsAgentyTab2 = _interopRequireDefault(_toolsAgentyTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 我的待审 */
//兼容ie


//引入头部
var Agenty = function (_React$Component) {
    _inherits(Agenty, _React$Component);

    function Agenty(arg) {
        _classCallCheck(this, Agenty);

        var _this = _possibleConstructorReturn(this, (Agenty.__proto__ || Object.getPrototypeOf(Agenty)).call(this, arg));

        var th = _this;
        return _this;
    }

    _createClass(Agenty, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var th = this;

            $(window).on("EVENT_CLOSELEFTBAR", function (t) {
                th.agentyTabel(); //绑定表哥
            });
        }
    }, {
        key: "agentyTabel",
        value: function agentyTabel() {
            var opens = function opens(arg, data) {
                console.log(arg);
            };
            var formatter = function formatter(txt, data) {
                return "<a href='javascript:;' >" + txt + "</a>";
            };
            var tabel = this.tabel = $("#agentyBoxTabel"),
                col = [[{ field: "type", title: "审批类型", align: "center", width: 120, fixed: true, formatter: formatter }, { field: "content", title: "审批内容", align: "center", width: 120 }, { field: "people", title: "提交人", align: "center", width: 120, fixed: true }, { field: "time", title: "提交时间", align: "center", width: 120, fixed: true }]],
                da = {
                total: 20,
                rows: [{ type: "审批类型", content: "1审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "2审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "3审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "4审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "5审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "6审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "7审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "8审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "9审批内容", people: "提交人", time: "2017-20-20" }, { type: "审批类型", content: "0审批内容", people: "提交人", time: "2017-20-20" }]
            };
            tabel.datagrid({
                width: "auto",
                nowrap: true,
                fitColumns: true,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pagination: true,
                columns: col,
                data: da

            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "article",
                null,
                _react2.default.createElement(_toolsAgentyTab2.default, { parent: this.props }),
                _react2.default.createElement(
                    "section",
                    { className: "agentyBox mgT20" },
                    _react2.default.createElement("table", { id: "agentyBoxTabel" })
                )
            );
        }
    }]);

    return Agenty;
}(_react2.default.Component);

exports.default = Agenty;

/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(24);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(86);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(76);

__webpack_require__(85);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 代办头部 */


//兼容ie

var ToolsTtab = function (_React$Component) {
    _inherits(ToolsTtab, _React$Component);

    function ToolsTtab(arg) {
        _classCallCheck(this, ToolsTtab);

        var _this = _possibleConstructorReturn(this, (ToolsTtab.__proto__ || Object.getPrototypeOf(ToolsTtab)).call(this, arg));

        _this.bindLeftBart();
        _this.state = {
            data: [{ "guid": "1", "text": "我的待审", "tap": "agenty" }, { "guid": "2", "text": "我的申请", "tap": "apply" }, { "guid": "3", "text": "我的草稿", "tap": "draft" }, { "guid": "4", "text": "审批历史", "tap": "approalHistory" }]
        };
        return _this;
    }

    _createClass(ToolsTtab, [{
        key: 'bindLeftBart',
        value: function bindLeftBart() {
            $(".JH-Content").addClass("CLASS_AGENTY");
            setTimeout(function (a) {
                $(window).trigger("EVENT_CLOSELEFTBAR");
            }, 1000);
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
                case "agenty":
                    iss.hashHistory.push("agenty", { "state": "001" });break;
                case "apply":
                    iss.hashHistory.push("apply", { "state": "002" });break;
                case "draft":
                    iss.hashHistory.push("draft", { "state": "002" });break;
                case "approalHistory":
                    iss.hashHistory.push("approalHistory", { "state": "002" });break;
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

    return ToolsTtab;
}(_react2.default.Component);

exports.default = ToolsTtab;

/***/ })

});