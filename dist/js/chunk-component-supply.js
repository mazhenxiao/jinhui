webpackJsonp([2],{

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(77);

var _toolsIndexTab = __webpack_require__(579);

var _toolsIndexTab2 = _interopRequireDefault(_toolsIndexTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 供货 */
//兼容ie


//标签
var supply = function (_React$Component) {
    _inherits(supply, _React$Component);

    function supply(arg) {
        _classCallCheck(this, supply);

        return _possibleConstructorReturn(this, (supply.__proto__ || Object.getPrototypeOf(supply)).call(this, arg));
    }

    _createClass(supply, [{
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var th = this;

            th.icon = $(".icon-bar");
            window.onresize = function (arg) {
                th.icon.trigger("EVENT_TOGGLEBAR");
            };
            setTimeout(function (arg) {
                //绑定datagruid1
                //绑定datagruid2
                th.bindScroll(th.bind_table_ys(), th.bind_table_bm()); //绑定滚动
            }, 500);

            th.icon.on("EVENT_TOGGLEBAR", function (ev) {
                setTimeout(function () {
                    th.table_ys.datagrid("resize");
                    th.table_bm.datagrid("resize");
                }, 500);
                // myChart.setOption(option);
            });
        }
    }, {
        key: "bindScroll",
        value: function bindScroll($a, $b) {
            //绑定数据滚动
            var th = this;
            Promise.all([$a, $b]).then(function (arg) {
                var $ys = th.table_ys.data("datagrid").dc.body2,
                    $bm = th.table_bm.data("datagrid").dc.body2;
                var current = "",
                    x = 0,
                    y = 0,
                    t1 = void 0,
                    t2 = void 0;
                $ys.bind("scroll.JH", function (arg) {
                    clearTimeout(t1);
                    if (current == "bm") {
                        return;
                    }
                    var yst = arg.target;
                    x = yst.scrollLeft, y = yst.scrollTop;
                    current = "ys";
                    t1 = setTimeout(function (a) {
                        current = "";
                    }, 500);
                    $bm.scrollLeft(x).scrollTop(y);
                });
                $bm.bind("scroll.JH", function (arg) {
                    clearTimeout(t2);
                    if (current == "ys") {
                        return;
                    }
                    var bm = arg.target;
                    var x = bm.scrollLeft,
                        y = bm.scrollTop;
                    current = "bm";
                    t2 = setTimeout(function (a) {
                        current = "";
                    }, 500);
                    $ys.scrollLeft(x).scrollTop(y);
                });
            }, function (error) {});
        }
    }, {
        key: "addTodo",
        value: function addTodo(text) {}
    }, {
        key: "bind_table_ys",
        value: function bind_table_ys() {
            var _data = [{ area: "建设用地面积", number: "-", count: "", group: "" }, { area: "建设用地面积", number: "-", count: "", group: "" }, { area: "建设用地面积", number: "-", count: "", group: "" }, { area: "建设用地面积", area201701: "-", count: "", group: "" }];
            var table = this.table_ys = $("#table-ys");
            table.datagrid({
                width: "auto",
                nowrap: true,
                fitColumns: true,
                // rownumbers:true,
                singleSelect: true,
                frozenColumns: [[{ field: 'area', align: "center", title: '供货', rowspan: 1, width: 350, fixed: true }]],
                columns: [[{ field: '', align: "center", title: '全盘', colspan: 2, width: 120, fixed: true }, { field: 'count', align: "center", title: '当年期初累计供货（A）', colspan: 2, width: 120, fixed: true }, { field: 'group', align: "center", title: '当年期初存货（B）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '当年预算新增供货（C）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '当年预算新增供货（D）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '当年预算新增供货（E）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年1月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年2月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年3月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年4月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年5月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年6月', colspan: 2, width: 90 }], [{ field: 'count', align: "center", title: '总面积', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '总货值', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, //==

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }]],
                data: _data
            });
            var promise_ys = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                });
            });
            return promise_ys;
        }
    }, {
        key: "bind_table_bm",
        value: function bind_table_bm() {
            var _data = [{ area: "area", number: "number-", count: "2count", group: "3group" }, { area: "2", number: "-", count: "", group: "" }, { area: "3", number: "-", count: "", group: "" }, { area: "4", number: "-", count: "", group: "" }];
            var table = this.table_bm = $("#table-bm");
            table.datagrid({
                width: "auto",
                nowrap: true,
                fitColumns: true,
                // rownumbers:true,
                singleSelect: true,
                frozenColumns: [[{ field: 'area', align: "center", title: '供货', rowspan: 1, width: 350, fixed: true }]],
                columns: [[{ field: '', align: "center", title: '全盘', colspan: 2, width: 120, fixed: true }, { field: 'count', align: "center", title: '当年期初累计供货（A）', colspan: 2, width: 120, fixed: true }, { field: 'group', align: "center", title: '当年期初存货（B）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '当年预算新增供货（C）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '当年预算新增供货（D）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '当年预算新增供货（E）', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年1月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年2月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年3月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年4月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年5月', colspan: 2, width: 90 }, { field: 'group', align: "center", title: '2017年6月', colspan: 2, width: 90 }], [{ field: 'count', align: "center", title: '总面积', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '总货值', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, //==

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true }, { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }]],
                data: _data
            });

            var promise_dm = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                });
            });
            return promise_dm;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("React-tools-tab", { className: "React-tools-tab", id: "React-tools-tab" }),
                _react2.default.createElement(_toolsIndexTab2.default, { parent: this.props }),
                _react2.default.createElement(
                    "article",
                    { className: "index-supply mgT20" },
                    _react2.default.createElement(
                        "section",
                        { className: "supply-ys" },
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
                            _react2.default.createElement("table", { className: "formTable", id: "table-ys", width: "100%" })
                        )
                    ),
                    _react2.default.createElement(
                        "section",
                        { className: "supply-bm mgT20" },
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
                            _react2.default.createElement("table", { className: "formTable", id: "table-bm", width: "100%" })
                        )
                    )
                )
            );
        }
    }]);

    return supply;
}(_react2.default.Component);

exports.default = supply;

/***/ }),

/***/ 579:
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

/***/ })

});