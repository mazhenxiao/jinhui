webpackJsonp([23],{

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(65);

__webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//兼容ie
var AreaManagementTabel = function (_React$Component) {
    _inherits(AreaManagementTabel, _React$Component);

    function AreaManagementTabel() {
        _classCallCheck(this, AreaManagementTabel);

        return _possibleConstructorReturn(this, (AreaManagementTabel.__proto__ || Object.getPrototypeOf(AreaManagementTabel)).apply(this, arguments));
    }

    _createClass(AreaManagementTabel, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "article",
                null,
                _react2.default.createElement(
                    "header",
                    { className: "iss-headTitle" },
                    _react2.default.createElement(
                        "ul",
                        { className: "iss-headTitle-bar" },
                        _react2.default.createElement(
                            "li",
                            null,
                            "\u89C4\u5212\u65B9\u6848"
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            "\u4EA7\u54C1\u6784\u6210"
                        )
                    ),
                    _react2.default.createElement(
                        "p",
                        { className: "iss-headTitle-bar" },
                        "\uFF08\u9762\u79EF\u5355\u4F4D\uFF1A\u33A1\uFF0C\u8F66\u4F4D\u5355\u4F4D\uFF1A\u4E2A\uFF0C\u9650\u9AD8\u5355\u4F4D\uFF1A\u7C73\uFF09"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "iss-headTitle-button" },
                        _react2.default.createElement(
                            "button",
                            { className: "refresh-icon addIcon" },
                            "\u751F\u6210\u65B0\u7248\u672C"
                        ),
                        _react2.default.createElement(
                            "button",
                            { className: "refresh-icon addIcon ClickThePopUp3" },
                            "\u4E1A\u6001/\u697C\u680B\u7EF4\u62A4"
                        ),
                        _react2.default.createElement(
                            "p",
                            null,
                            _react2.default.createElement(
                                "label",
                                null,
                                "\u5F53\u524D\u7248\u672C\uFF1A"
                            ),
                            _react2.default.createElement("input", { type: "text", id: "version" })
                        ),
                        _react2.default.createElement(
                            "p",
                            null,
                            "\u72B6\u6001\uFF1A\u7F16\u5236\u4E2D"
                        )
                    )
                ),
                _react2.default.createElement(
                    "section",
                    { className: "AM-block" },
                    _react2.default.createElement("div", { className: "AM-block-child", id: "AM-block-child-programme" }),
                    _react2.default.createElement("div", { className: "AM-block-child", id: "AM-block-child-constitute" })
                )
            );
        }
    }]);

    return AreaManagementTabel;
}(_react2.default.Component);

exports.default = AreaManagementTabel;

/***/ })

});