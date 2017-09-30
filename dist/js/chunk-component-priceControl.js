webpackJsonp([8],{

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(78);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(65);

__webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * 首页导航条
 * index  identity  supply  所需
 */


//兼容ie

var PriceControl = function (_React$Component) {
    _inherits(PriceControl, _React$Component);

    function PriceControl(arg) {
        _classCallCheck(this, PriceControl);

        var _this = _possibleConstructorReturn(this, (PriceControl.__proto__ || Object.getPrototypeOf(PriceControl)).call(this, arg));

        _this.bindTab();
        _this.state = {
            legend: [{ "guid": "l1", "text": "未编制", "class": "legend-white" }, { "guid": "l2", "text": "编制中", "class": "legend-blue" }, { "guid": "l3", "text": "审批通过", "class": "legend-green" }, { "guid": "l4", "text": "审批驳回", "class": "legend-red" }],
            stage: [{ "guid": "s1", "text": "投决会", "tap": "priceInvestment", "class": "legend-blue" }, { "guid": "s2", "text": "产品定位会", "tap": "priceProductlocat", "class": "legend-green" }, { "guid": "s3", "text": "项目定位会", "tap": "priceProjectlocat", "class": "legend-white" }, { "guid": "s4", "text": "启动会", "tap": "priceStartup", "class": "legend-green" }, { "guid": "s5", "text": "工规证", "tap": "priceCertificate", "class": "legend-blue" }, { "guid": "s6", "text": "决策书", "tap": "priceDecision", "class": "legend-red" }, { "guid": "s7", "text": "预售证", "tap": "pricePresell", "class": "legend-white" }, { "guid": "s6", "text": "签约", "tap": "priceContract", "class": "legend-white" }, { "guid": "s6", "text": "交付", "tap": "priceDeliver", "class": "legend-white" }]
        };
        return _this;
    }

    _createClass(PriceControl, [{
        key: 'bindTab',
        value: function bindTab(prop) {
            $(".JH-Content").removeClass("CLASS_AGENTY");
            // ReactDOM.render(<ToolsTtab parent={prop}/>,document.querySelector("#React-tools-tab"));
        }
        /* 事件 */

    }, {
        key: 'Event_Cutup',
        value: function Event_Cutup(data, ev) {
            var el = $(ev.target);
            el.parent().find("li").removeClass("active");
            setTimeout(function () {
                el.addClass("active");
            });
            switch (data) {
                case "priceInvestment":
                    iss.hashHistory.push("priceInvestment", { "state": "001" });break;
                case "priceProductlocat":
                    iss.hashHistory.push("priceProductlocat", { "state": "002" });break;
                case "priceProjectlocat":
                    iss.hashHistory.push("priceProjectlocat", { "state": "003" });break;
                case "priceStartup":
                    iss.hashHistory.push("priceStartup", { "state": "004" });break;
                case "priceCertificate":
                    iss.hashHistory.push("priceCertificate", { "state": "005" });break;
                case "priceDecision":
                    iss.hashHistory.push("priceDecision", { "state": "006" });break;
                case "pricePresell":
                    iss.hashHistory.push("pricePresell", { "state": "007" });break;
                case "priceContract":
                    iss.hashHistory.push("priceContract", { "state": "008" });break;
                case "priceDeliver":
                    iss.hashHistory.push("priceDeliver", { "state": "009" });break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var th = this;
            var legendlist = this.state.legend.map(function (da, ind) {
                return _react2.default.createElement(
                    'li',
                    { key: ind, className: '' },
                    _react2.default.createElement('i', { className: da.class }),
                    da.text
                );
            });
            var stagelist = this.state.stage.map(function (da, ind) {
                return _react2.default.createElement(
                    'li',
                    { key: ind, className: '', onClick: th.Event_Cutup.bind(th, da.tap) },
                    _react2.default.createElement('i', { className: da.class }),
                    da.text
                );
            });
            return _react2.default.createElement(
                'header',
                { className: 'price' },
                _react2.default.createElement(
                    'ul',
                    { className: 'price-legend' },
                    legendlist
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'price-stage price-left' },
                    stagelist
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'price-right' },
                    _react2.default.createElement('i', { className: 'addIcon' }),
                    _react2.default.createElement(
                        'a',
                        { className: 'btn-refish', href: 'javascript:;' },
                        '\u751F\u6210\u65B0\u7248\u672C'
                    )
                ),
                _react2.default.createElement('i', { className: 'clearboth' })
            );
        }
    }]);

    return PriceControl;
}(_react2.default.Component);

exports.default = PriceControl;

/***/ })

});