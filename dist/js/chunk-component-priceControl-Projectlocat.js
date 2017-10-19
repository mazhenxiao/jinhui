webpackJsonp([4,14],{

/***/ 585:
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

var _toolsProcessBar = __webpack_require__(610);

var _toolsProcessBar2 = _interopRequireDefault(_toolsProcessBar);

var _toolsExchangeButton = __webpack_require__(612);

var _toolsExchangeButton2 = _interopRequireDefault(_toolsExchangeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * 价格
 */
//兼容ie


var PriceControl = function (_React$Component) {
    _inherits(PriceControl, _React$Component);

    function PriceControl(arg) {
        _classCallCheck(this, PriceControl);

        var _this = _possibleConstructorReturn(this, (PriceControl.__proto__ || Object.getPrototypeOf(PriceControl)).call(this, arg));

        _this.bindTab();
        _this.state = {
            actionUrl: {
                "GetDataGridTitle": "/Common/GetDataGridTitle", //由组获取指标
                "GetPriceList": "/Price/GetPriceList", //获取价格表格数据
                "GetVersions": "/Common/GetVersionListByBusinessId", //获取版本列表
                "CreatePriceVersion": "/Price/CreatePriceVersion" //创建价格管理版本
            },
            title: { //表格标题
                frozenColumns: [], //固定列
                columns: [] //滚动列
            },
            gridData: [], //表格数据
            version: [], //版本
            step: -2, //阶段
            stepName: "", //阶段名称
            curVersion: "" //当前版本
        };
        return _this;
    }

    _createClass(PriceControl, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // render之前
            // sessionStorage['pricestep'] = "1";
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // render之后
            var th = this;
            this.initDataParamers("GetVersions");
            th.icon = $(".icon-bar");
            window.onresize = function (arg) {
                th.icon.trigger("EVENT_TOGGLEBAR");
            };
        }
    }, {
        key: 'setVersionStatus',
        value: function setVersionStatus(status) {
            var _text = status == 0 ? "编制中" : status == 1 ? "审批中" : "已审批";
            $("#statusText").html(_text);
        }
    }, {
        key: 'initDataParamers',
        value: function initDataParamers(type) {
            var _url = "";
            var _data;
            var _afterfn;
            var _th = this;
            switch (type) {
                case "GetDataGridTitle":
                    {
                        _url = _th.state.actionUrl.GetDataGridTitle;
                        _th.loadData(_url, {
                            "columns": "PriceTitleColumns",
                            "frozenColumns": "PriceTitleFrozenColumns"
                        }, function (result) {
                            _th.state.title.frozenColumns = result.frozenColumns;
                            _th.state.title.columns = result.columns;
                            _th.initDataParamers("GetPriceList");
                        });
                    };break;
                case "GetPriceList":
                    {
                        _url = _th.state.actionUrl.GetPriceList;
                        _th.loadData(_url, {
                            "stageversionid": _th.state.curVersion,
                            "step": _th.state.step
                        }, function (result) {
                            _th.state.gridData = result;
                            setTimeout(function (arg) {
                                //绑定datagruid1
                                _th.bind_table();
                            }, 500);
                        });
                    };break;
                case "GetVersions":
                    {
                        _url = _th.state.actionUrl.GetVersions;
                        _th.loadData(_url, {
                            //"stageversionid": "111F08DBE35B4B90A9288CFC7FBEB924",
                            "versionId": iss.id.id,
                            "projectlevel": 2,
                            "step": _th.state.step,
                            "dataType": 3 //1分期
                        }, function (result) {
                            var _vd = [];
                            var _tdta = result;
                            var _inx = 0;
                            if (_tdta != null && _tdta.length > 0) {
                                $('.haveversion,.price-editsave').show();
                                $('.noversion').hide();
                                _inx = _tdta.length;
                                for (var i = 0; i < _inx; i++) {
                                    var _t = {
                                        "guid": i,
                                        "value": _tdta[i].ID,
                                        "text": "V" + (_tdta[i].STATUS == 99 ? _tdta[i].VERSIONCODE + " " + new Date(_tdta[i].APPROVETIME).Format("yyyy-MM-dd") : _tdta[i].VERSIONCODE),
                                        "status": _tdta[i].STATUS
                                    };
                                    _vd.push(_t);
                                }
                                _th.state.curVersion = _tdta[0].ID;
                                if (_tdta[0].STATUS != 99) {
                                    $(".price-createpriceversion").hide();
                                } else {
                                    $(".price-createpriceversion").show();
                                }
                                _th.setVersionStatus(_tdta[0].STATUS);
                                _th.initDataParamers("GetDataGridTitle");
                            } else {
                                // _vd = [{
                                //     "guid": -1,
                                //     "value": -1,
                                //     "text": '无版本',
                                //     "status": -1
                                // }];
                                _vd = [];
                                $('.haveversion,.price-editsave').hide();
                                $('.noversion').show();
                                _th.initDataParamers("GetDataGridTitle");
                            }
                            _th.setState({
                                version: _vd
                            });
                        });
                    };break;
                default:
            }
        }
    }, {
        key: 'loadData',
        value: function loadData(url, data, afterfn) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "JSON",
                data: data,
                success: function success(result) {
                    if (result.errorcode != 200) {
                        iss.Alert({
                            "title": "提示",
                            "content": result.message,
                            "width": 300
                        });
                    } else {
                        if (typeof afterfn == "function") {
                            afterfn(result.rows);
                        }
                    }
                },
                error: function error(ex) {
                    console.log(ex);
                }
            });
        }
    }, {
        key: 'bind_table',
        value: function bind_table() {
            var table = this.table_ys = $("#table-ys");
            table.datagrid({
                width: "auto",
                nowrap: true,
                fitColumns: true,
                // rownumbers: true,
                singleSelect: true,
                frozenColumns: this.state.title.frozenColumns,
                columns: this.state.title.columns,
                data: this.state.gridData
            });
        }
    }, {
        key: 'createNewPriceVersion',
        value: function createNewPriceVersion() {
            var th = this;
            $.ajax({
                url: this.state.actionUrl.CreatePriceVersion,
                type: "POST",
                dataType: "JSON",
                data: {
                    //"stageversionid": "111F08DBE35B4B90A9288CFC7FBEB924",
                    "versionId": iss.id.id,
                    "projectlevel": 2,
                    "step": this.state.step
                },
                success: function success(result) {
                    if (result.errorcode != 200) {
                        iss.Alert({
                            "title": "提示",
                            "content": result.message,
                            "width": 300
                        });
                    } else {
                        th.initDataParamers("GetVersions");
                    }
                },
                error: function error(ex) {
                    console.log(ex);
                }
            });
        }
    }, {
        key: 'changeVersion',
        value: function changeVersion(ts, e) {
            this.state.curVersion = ts.target.value;
            $("#statusText").html(this.setVersionStatus($('#version option:selected').attr("data-status")));
            this.initDataParamers("GetPriceList");
        }
    }, {
        key: 'bindTab',
        value: function bindTab(prop) {
            $(".JH-Content").removeClass("CLASS_AGENTY");
        }
    }, {
        key: 'BIND_CALLBACK2',
        value: function BIND_CALLBACK2(data) {
            debugger;
        }
        /* 事件 */

    }, {
        key: 'BIND_CALLBACK',
        value: function BIND_CALLBACK(data, ev) {
            this.state.step = data.guid;
            this.state.stepName = data.text;
            $('.priceTapTitle').html(data.text + "价格");
            this.initDataParamers("GetVersions");
            // iss.hashHistory.push("priceInvestment", { "state": "001" });
            // iss.hashHistory.push({
            //     pathname: "priceInvestment", state: { "state": data.guid }
            // });
            // let el = $(ev.target);
            // el.parent().find("li").removeClass("active");
            // setTimeout(() => { el.addClass("active") });
            // switch (data.tap) {
            //     case "priceInvestment": iss.hashHistory.push("component-priceControl-Investment", { "state": "001" }); break;
            //     case "priceProductlocat": iss.hashHistory.push("component-priceControl-Productlocat", { "state": "002" }); break;
            //     case "priceProjectlocat": iss.hashHistory.push("component-priceControl-Projectlocat", { "state": "003" }); break;
            //     case "priceStartup": iss.hashHistory.push("component-priceControl-Startup", { "state": "004" }); break;
            //     case "priceCertificate": iss.hashHistory.push("component-priceControl-Certificate", { "state": "005" }); break;
            //     case "priceDecision": iss.hashHistory.push("component-priceControl-Decision", { "state": "006" }); break;
            //     case "pricePresell": iss.hashHistory.push("component-priceControl-Presell", { "state": "007" }); break;
            //     case "priceContract": iss.hashHistory.push("component-priceControl-Contract", { "state": "008" }); break;
            //     case "priceDeliver": iss.hashHistory.push("component-priceControl-Deliver", { "state": "009" }); break;
            // }
        }
    }, {
        key: 'render',
        value: function render() {
            var th = this;
            var versionlist = this.state.version.map(function (da, ind) {
                return _react2.default.createElement(
                    'option',
                    { key: ind, value: da.value, 'data-status': da.status },
                    da.text
                );
            });
            return _react2.default.createElement(
                'article',
                null,
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'header',
                        { className: 'price' },
                        _react2.default.createElement(_toolsProcessBar2.default, { edit: 'true', callback: this.BIND_CALLBACK.bind(this) }),
                        _react2.default.createElement(
                            'div',
                            { className: 'price-right' },
                            _react2.default.createElement('i', { className: 'addIcon' })
                        ),
                        _react2.default.createElement('i', { className: 'clearboth' })
                    )
                ),
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement('React-tools-tab', { className: 'React-tools-tab', id: 'React-tools-tab' }),
                    _react2.default.createElement(
                        'article',
                        { className: 'index-supply mgT20 clearboth' },
                        _react2.default.createElement(
                            'section',
                            { className: 'supply-ys' },
                            _react2.default.createElement(
                                'header',
                                { className: 'HeaderBar' },
                                _react2.default.createElement(
                                    'h5',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'price-left priceTapTitle' },
                                        '\u6295\u51B3\u4F1A\u4EF7\u683C'
                                    ),
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'price-right opers' },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'jh-icons ahover price-createpriceversion' },
                                            _react2.default.createElement(
                                                'a',
                                                { className: 'btn-refish', href: 'javascript:;', onClick: this.createNewPriceVersion.bind(this) },
                                                '\u751F\u6210\u65B0\u7248\u672C'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'jh-icons jh-vtop price-editsave' },
                                            _react2.default.createElement(_toolsExchangeButton2.default, { 'data-unique': 'price', edit: 'true', callback: this.BIND_CALLBACK2.bind(this) })
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'haveversion' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                '\u5F53\u524D\u7248\u672C\uFF1A'
                                            ),
                                            _react2.default.createElement(
                                                'select',
                                                { id: 'version', onChange: this.changeVersion.bind(this) },
                                                versionlist
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'haveversion uncursor' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                '\u72B6\u6001\uFF1A'
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                { id: 'statusText' },
                                                '\u7F16\u5236\u4E2D'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'noversion uncursor' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                '\u6682\u65E0\u7248\u672C'
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement('table', { className: 'formTable', id: 'table-ys', width: '100%' })
                        )
                    )
                )
            );
        }
    }]);

    return PriceControl;
}(_react2.default.Component);

exports.default = PriceControl;

// import React from 'react';
// /**
//  * 首页导航条
//  * index  identity  supply  所需
//  */
// import ReactDOM from 'react-dom';
// import "../js/iss.js";
// import "babel-polyfill";  //兼容ie
// import ProcessBar from "./tools-processBar.js";

// class PriceControl extends React.Component {
//     constructor(arg) {
//         super(arg);
//         this.bindTab();
//         this.state = {};
//     }
//     componentWillMount() {
//         // render之前
//         sessionStorage['pricestep'] = "1";
//     }
//     bindTab(prop) {
//         $(".JH-Content").removeClass("CLASS_AGENTY");
//     }
//     /* 事件 */
//     BIND_CALLBACK(data, ev) {
//         sessionStorage['pricestep'] = data.guid;
//         // iss.hashHistory.push("priceInvestment", { "state": "001" });
//         // iss.hashHistory.push({
//         //     pathname: "priceInvestment", state: { "state": data.guid }
//         // });
//         // let el = $(ev.target);
//         // el.parent().find("li").removeClass("active");
//         // setTimeout(() => { el.addClass("active") });
//         switch (data.tap) {
//             case "priceInvestment": iss.hashHistory.push("component-priceControl-Investment", { "state": "001" }); break;
//             case "priceProductlocat": iss.hashHistory.push("component-priceControl-Productlocat", { "state": "002" }); break;
//             case "priceProjectlocat": iss.hashHistory.push("component-priceControl-Projectlocat", { "state": "003" }); break;
//             case "priceStartup": iss.hashHistory.push("component-priceControl-Startup", { "state": "004" }); break;
//             case "priceCertificate": iss.hashHistory.push("component-priceControl-Certificate", { "state": "005" }); break;
//             case "priceDecision": iss.hashHistory.push("component-priceControl-Decision", { "state": "006" }); break;
//             case "pricePresell": iss.hashHistory.push("component-priceControl-Presell", { "state": "007" }); break;
//             case "priceContract": iss.hashHistory.push("component-priceControl-Contract", { "state": "008" }); break;
//             case "priceDeliver": iss.hashHistory.push("component-priceControl-Deliver", { "state": "009" }); break;
//         }
//     }
//     render() {
//         var th = this;
//         return <header className="price" >
//             <ProcessBar edit="true" callback={this.BIND_CALLBACK.bind(this)} />
//             <div className="price-right">
//                 <i className="addIcon"></i>
//                 <a className="btn-refish" href="javascript:;">生成新版本</a>
//             </div>
//             <i className="clearboth"></i>
//         </header>

//     }
// }

// export default PriceControl;


// import React from 'react';
// /**
//  * 首页导航条
//  * index  identity  supply  所需
//  */
// import ReactDOM from 'react-dom';
// import "../js/iss.js";
// import "babel-polyfill";  //兼容ie
// import ProcessBar from "./tools-processBar.js";

// class PriceControl extends React.Component {
//     constructor(arg) {
//         super(arg);
//         this.bindTab();
//         this.state = {};
//     }
//     componentWillMount() {
//         // render之前
//         sessionStorage['pricestep'] = "1";
//     }
//     bindTab(prop) {
//         $(".JH-Content").removeClass("CLASS_AGENTY");
//     }
//     /* 事件 */
//     BIND_CALLBACK(da) {
//         sessionStorage['pricestep'] = da.guid;
//         var th = this;
//         switch (da.tap) {
//             case "priceInvestment":
//             case "priceProductlocat": 
//             case "priceProjectlocat":
//             case "priceStartup": 
//             case "priceCertificate":
//             case "priceDecision": 
//             case "pricePresell": 
//             case "priceContract": 
//             case "priceDeliver": th.BIND_URL1(da); break;
//         }
//         // switch (data.tap) {
//         //     case "priceInvestment": iss.hashHistory.push("component-priceControl-Investment", { "state": "001" }); break;
//         //     case "priceProductlocat": iss.hashHistory.push("component-priceControl-Productlocat", { "state": "002" }); break;
//         //     case "priceProjectlocat": iss.hashHistory.push("component-priceControl-Projectlocat", { "state": "003" }); break;
//         //     case "priceStartup": iss.hashHistory.push("component-priceControl-Startup", { "state": "004" }); break;
//         //     case "priceCertificate": iss.hashHistory.push("component-priceControl-Certificate", { "state": "005" }); break;
//         //     case "priceDecision": iss.hashHistory.push("component-priceControl-Decision", { "state": "006" }); break;
//         //     case "pricePresell": iss.hashHistory.push("component-priceControl-Presell", { "state": "007" }); break;
//         //     case "priceContract": iss.hashHistory.push("component-priceControl-Contract", { "state": "008" }); break;
//         //     case "priceDeliver": iss.hashHistory.push("component-priceControl-Deliver", { "state": "009" }); break;
//         // }
//     }
//     BIND_URL1(da) {
//         require.ensure([], function (require) {
//             let PriceManagementTabel = require('../components/component-priceControl-Management.js').default;
//             ReactDOM.render(<PriceManagementTabel data={da} />, document.querySelector("#priceManagement"));
//         }, "component-priceControl-Management");
//     }
//     render() {
//         var th = this;
//         return <article className="price" >
//             <section>
//                 <ProcessBar edit="true" callback={this.BIND_CALLBACK.bind(this)} />
//                 <div className="price-right">
//                     <i className="addIcon"></i>
//                     <a className="btn-refish" href="javascript:;">生成新版本</a>
//                 </div>
//                 <i className="clearboth"></i>
//             </section>
//             <section>
//                 <section className="mgT10" id="priceManagement">

//                 </section>
//             </section>
//         </article>
//     }
// }

// export default PriceControl;

/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(79);

var _componentPriceControl = __webpack_require__(585);

var _componentPriceControl2 = _interopRequireDefault(_componentPriceControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 价格管理-项目定位会 */
//兼容ie


//标签

var PriceProjectlocat = function (_React$Component) {
    _inherits(PriceProjectlocat, _React$Component);

    function PriceProjectlocat(arg) {
        var _arguments = arguments;

        _classCallCheck(this, PriceProjectlocat);

        // this.props.location.state;
        var _this = _possibleConstructorReturn(this, (PriceProjectlocat.__proto__ || Object.getPrototypeOf(PriceProjectlocat)).call(this, arg));

        iss.hashHistory.listen(function (local) {
            console.log(_arguments);
            // next();
        });
        _this.state = {
            actionUrl: {
                "GetDataGridTitle": "/Common/GetDataGridTitle", //由组获取指标
                "GetPriceList": "/Price/GetPriceList", //获取价格表格数据
                "GetVersions": "/Common/GetVersionListByBusinessId" //获取版本列表
            },
            title: { //表格标题
                frozenColumns: [], //固定列
                columns: [] //滚动列
            },
            gridData: [], //表格数据
            version: [], //版本
            curVersion: "" //当前版本
        };
        return _this;
    }

    _createClass(PriceProjectlocat, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            // render之前
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            // render之后
            var th = this;
            this.initDataParamers("GetVersions");
            th.icon = $(".icon-bar");
            window.onresize = function (arg) {
                th.icon.trigger("EVENT_TOGGLEBAR");
            };
        }
    }, {
        key: "Event_Change_Version",
        value: function Event_Change_Version(data, ev) {
            // let el = $(ev.target);
            // el.parent().find("li").removeClass("active");
            // setTimeout(() => { el.addClass("active") });
        }
    }, {
        key: "addTodo",
        value: function addTodo(text) {}
    }, {
        key: "setVersionStatus",
        value: function setVersionStatus(status) {
            var _text = status == 1 ? "编制中" : status == 2 ? "审批中" : "已审批";
            $("#statusText").html(_text);
        }
    }, {
        key: "initDataParamers",
        value: function initDataParamers(type) {
            var _url = "";
            var _data;
            var _afterfn;
            var _th = this;
            switch (type) {
                case "GetDataGridTitle":
                    {
                        _url = _th.state.actionUrl.GetDataGridTitle;
                        _th.loadData(_url, {
                            "columns": "PriceTitleColumns",
                            "frozenColumns": "PriceTitleFrozenColumns"
                        }, function (result) {
                            _th.state.title.frozenColumns = result.frozenColumns;
                            _th.state.title.columns = result.columns;
                            _th.initDataParamers("GetPriceList");
                        });
                    };break;
                case "GetPriceList":
                    {
                        _url = _th.state.actionUrl.GetPriceList;
                        _th.loadData(_url, {
                            "stageversionid": _th.state.curVersion,
                            "step": 1
                        }, function (result) {
                            _th.state.gridData = result;
                            setTimeout(function (arg) {
                                //绑定datagruid1
                                _th.bind_table();
                            }, 500);
                        });
                    };break;
                case "GetVersions":
                    {
                        _url = _th.state.actionUrl.GetVersions;
                        _th.loadData(_url, {
                            "versionId": "111F08DBE35B4B90A9288CFC7FBEB924",
                            // "versionId": iss.id.id,
                            "dataType": sessionStorage['pricestep']
                        }, function (result) {
                            var _vd = [];
                            var _tdta = result;
                            var _inx = 0;
                            if (_tdta != null && _tdta.length > 1) {
                                _inx = _tdta.length;
                                for (var i = 0; i < _inx; i++) {
                                    var _t = {
                                        "guid": i,
                                        "value": _tdta[i].ID,
                                        "text": _tdta[i].STATUS == 3 ? _tdta[i].VERSIONCODE + " " + new Date(_tdta[i].APPROVETIME).Format("yyyy-MM-dd") : _tdta[i].VERSIONCODE,
                                        "status": _tdta[i].STATUS
                                    };
                                    _vd.push(_t);
                                }
                                _th.state.curVersion = _tdta[0].ID;
                                _th.setState({
                                    version: _vd
                                });
                                _th.setVersionStatus(_tdta[0].STATUS);
                                _th.initDataParamers("GetDataGridTitle");
                            }
                        });
                    };break;
                default:
            }
        }
    }, {
        key: "loadData",
        value: function loadData(url, data, afterfn) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "JSON",
                data: data,
                success: function success(result) {
                    if (result.errorcode != 200) {
                        iss.Alert({
                            "title": "取数失败",
                            "content": result.message,
                            "width": 300
                        });
                    } else {
                        if (typeof afterfn == "function") {
                            afterfn(result.rows);
                        }
                    }
                },
                error: function error(ex) {
                    console.log(ex);
                }
            });
        }
    }, {
        key: "bind_table",
        value: function bind_table() {
            var table = this.table_ys = $("#table-ys");
            table.datagrid({
                width: "auto",
                nowrap: true,
                fitColumns: true,
                rownumbers: true,
                singleSelect: true,
                frozenColumns: this.state.title.frozenColumns,
                columns: this.state.title.columns,
                data: this.state.gridData
            });
        }
    }, {
        key: "changeVersion",
        value: function changeVersion(ts, e) {
            this.state.curVersion = ts.target.value;
            $("#statusText").html(this.setVersionStatus($('#version option:selected').attr("data-status")));
            this.initDataParamers("GetPriceList");
        }
    }, {
        key: "render",
        value: function render() {
            var versionlist = this.state.version.map(function (da, ind) {
                return _react2.default.createElement(
                    "option",
                    { key: ind, value: da.value, "data-status": da.status },
                    da.text
                );
            });
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("React-tools-tab", { className: "React-tools-tab", id: "React-tools-tab" }),
                _react2.default.createElement(_componentPriceControl2.default, { parent: this.props }),
                _react2.default.createElement(
                    "article",
                    { className: "index-supply mgT20 clearboth" },
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
                                    { className: "price-left" },
                                    "\u6295\u51B3\u4F1A\u4EF7\u683C"
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "price-right opers" },
                                    _react2.default.createElement(
                                        "li",
                                        { className: "jh-icons" },
                                        _react2.default.createElement(
                                            "a",
                                            { className: "btn-refish", href: "javascript:;" },
                                            "\u751F\u6210\u65B0\u7248\u672C"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "li",
                                        { className: "jh-icons" },
                                        _react2.default.createElement("i", { className: "jh-icon jh-icons-edit" }),
                                        _react2.default.createElement(
                                            "span",
                                            null,
                                            "\u7F16\u8F91"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "span",
                                            null,
                                            "\u5F53\u524D\u7248\u672C\uFF1A"
                                        ),
                                        _react2.default.createElement(
                                            "select",
                                            { id: "version", onChange: this.changeVersion.bind(this) },
                                            versionlist
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "span",
                                            null,
                                            "\u72B6\u6001\uFF1A"
                                        ),
                                        _react2.default.createElement(
                                            "span",
                                            { id: "statusText" },
                                            "\u7F16\u5236\u4E2D"
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement("table", { className: "formTable", id: "table-ys", width: "100%" })
                    )
                )
            );
        }
    }]);

    return PriceProjectlocat;
}(_react2.default.Component);

exports.default = PriceProjectlocat;

/***/ }),

/***/ 606:
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

/***/ 607:
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

var	fixUrls = __webpack_require__(609);

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

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(611);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(607)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./tools-processBar.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./tools-processBar.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 609:
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

/***/ 610:
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
__webpack_require__(608);

var ProcessBar = function (_React$Component) {
    _inherits(ProcessBar, _React$Component);

    function ProcessBar(arg) {
        _classCallCheck(this, ProcessBar);

        var _this = _possibleConstructorReturn(this, (ProcessBar.__proto__ || Object.getPrototypeOf(ProcessBar)).call(this, arg));

        _this.state = {
            legend: [{ "guid": "l1", "text": "未编制", "class": "legend-white" }, { "guid": "l2", "text": "编制中", "class": "legend-blue" }, { "guid": "l3", "text": "审批通过", "class": "legend-green" }, { "guid": "l4", "text": "审批驳回", "class": "legend-red" }],
            stage: [{ "guid": "1", "text": "投决会", "tap": "priceInvestment", "class": "legend-blue" }, { "guid": "2", "text": "产品定位会", "tap": "priceProductlocat", "class": "legend-green" }, { "guid": "3", "text": "项目定位会", "tap": "priceProjectlocat", "class": "legend-white" }, { "guid": "4", "text": "启动会", "tap": "priceStartup", "class": "legend-green" }, { "guid": "5", "text": "工规证", "tap": "priceCertificate", "class": "legend-blue" }, { "guid": "6", "text": "决策书", "tap": "priceDecision", "class": "legend-red" }, { "guid": "7", "text": "预售证", "tap": "pricePresell", "class": "legend-white" }, { "guid": "8", "text": "签约", "tap": "priceContract", "class": "legend-white" }, { "guid": "9", "text": "交付", "tap": "priceDeliver", "class": "legend-white" }]
        };
        return _this;
    }

    _createClass(ProcessBar, [{
        key: "BIND_HEADER",
        value: function BIND_HEADER() {
            //绑定头部内容
            return this.state.legend.map(function (el, ind) {
                return _react2.default.createElement(
                    "li",
                    { key: ind, "data-guid": el.guid, className: el.class },
                    el.text
                );
            });
        }
    }, {
        key: "EVENT_CLICK_LIST",
        value: function EVENT_CLICK_LIST(da, ev) {
            this.props["callback"] && this.props["callback"](da);
            $(".processBar-List li").removeClass("active");
            $(ev.currentTarget).addClass("active");
            // $(ev.current)
        }
    }, {
        key: "BIND_LIST",
        value: function BIND_LIST() {
            var _this2 = this;

            //绑定list表
            var len = this.state.stage.length;
            return this.state.stage.map(function (el, ind) {
                return _react2.default.createElement(
                    "li",
                    { style: { zIndex: len - ind }, onClick: _this2.EVENT_CLICK_LIST.bind(_this2, el), key: ind, "data-guid": el.guid, "data-tap": el.tap },
                    _react2.default.createElement("span", { className: el.class }),
                    el.text
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "processBar" },
                _react2.default.createElement(
                    "ul",
                    { className: "processBar-header" },
                    this.BIND_HEADER()
                ),
                _react2.default.createElement(
                    "ul",
                    { className: "processBar-List" },
                    this.BIND_LIST()
                )
            );
        }
    }]);

    return ProcessBar;
}(_react2.default.Component);

exports.default = ProcessBar;

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(606)(undefined);
// imports


// module
exports.push([module.i, ".processBar .processBar-header li {\n  display: inline-block;\n  margin-right: 20px;\n  height: 25px;\n  line-height: 25px;\n  color: #333;\n}\n.processBar .processBar-header li:before {\n  width: 15px;\n  height: 15px;\n  border: #ccc solid 1px;\n  content: \"\";\n  display: inline-block;\n  border-radius: 50%;\n  vertical-align: top;\n  margin-top: 5px;\n  margin-right: 5px;\n}\n.processBar .processBar-header li.legend-white:before {\n  background: #fff;\n}\n.processBar .processBar-header li.legend-blue:before {\n  background: #2979ff;\n}\n.processBar .processBar-header li.legend-green:before {\n  background: #00e676;\n}\n.processBar .processBar-header li.legend-red:before {\n  background: #e53935;\n}\n.processBar .processBar-List {\n  margin-top: 10px;\n}\n.processBar .processBar-List li {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  display: inline-block;\n  margin-left: 5px;\n  color: #333;\n  margin-right: 0;\n  height: 30px;\n  min-width: 95px;\n  text-align: left;\n  padding-left: 20px;\n  padding-right: 10px;\n  line-height: 30px;\n  color: #fff;\n  font-size: 12px;\n  background: #4c72a4;\n}\n.processBar .processBar-List li:first-child {\n  padding-left: 10px;\n  margin-left: 0;\n}\n.processBar .processBar-List li:nth-child(n+2):before {\n  position: absolute;\n  top: 0;\n  left: 0px;\n  z-index: 20;\n  content: \"\";\n  border-left: #fff solid 15px;\n  border-bottom: transparent solid 15px;\n  border-top: transparent solid 15px;\n}\n.processBar .processBar-List li:nth-child(n):after {\n  position: absolute;\n  top: 0;\n  right: -14px;\n  z-index: 20;\n  content: \"\";\n  border-left: #4c72a4 solid 15px;\n  border-bottom: transparent solid 15px;\n  border-top: transparent solid 15px;\n}\n.processBar .processBar-List li span {\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  border: #ccc solid 1px;\n  border-radius: 50%;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.processBar .processBar-List li span.legend-white {\n  background: #fff;\n}\n.processBar .processBar-List li span.legend-blue {\n  background: #2979ff;\n}\n.processBar .processBar-List li span.legend-green {\n  background: #00e676;\n}\n.processBar .processBar-List li span.legend-red {\n  background: #e53935;\n}\n.processBar .processBar-List li:hover,\n.processBar .processBar-List li.active {\n  background: #f1a118;\n  cursor: pointer;\n}\n.processBar .processBar-List li:hover::after,\n.processBar .processBar-List li.active::after {\n  border-left-color: #f1a118;\n}\n", ""]);

// exports


/***/ }),

/***/ 612:
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
__webpack_require__(608);

var ExchangeButton = function (_React$Component) {
    _inherits(ExchangeButton, _React$Component);

    function ExchangeButton(arg) {
        _classCallCheck(this, ExchangeButton);

        var _this = _possibleConstructorReturn(this, (ExchangeButton.__proto__ || Object.getPrototypeOf(ExchangeButton)).call(this, arg));

        _this.state = {
            btns: [
            // data={"[{'text':'保存'，'class':''},{}]"}
            { "guid": "0", "text": "编辑", "class": "jh-icon jh-icons-edit", "operType": "edit" }, { "guid": "1", "text": "保存", "class": "jh-icon jh-icons-save", "operType": "save" }],
            id: _this.props["data-unique"] + "changebtn"
        };
        return _this;
    }

    _createClass(ExchangeButton, [{
        key: "EVENT_CLICK_LIST",
        value: function EVENT_CLICK_LIST(da, ind) {
            $('#' + this.state.id).children("li").hide();
            var si = da.guid == "0" ? "1" : "0";
            $('#' + this.state.id).children("li").eq(parseInt(si)).show();
            this.props["callback"] && this.props["callback"](da);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            $('#' + this.state.id).children("li").hide();
            $('#' + this.state.id).children("li").eq(0).show();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var btneles = this.state.btns.map(function (da, ind) {
                return _react2.default.createElement(
                    "li",
                    { key: da.guid, onClick: _this2.EVENT_CLICK_LIST.bind(_this2, da), "data-oper": da.operType },
                    _react2.default.createElement("i", { className: da.class }),
                    _react2.default.createElement(
                        "span",
                        null,
                        da.text
                    )
                );
            });
            return _react2.default.createElement(
                "ul",
                { className: "opers btn-change jh-icons", id: this.state.id },
                btneles
            );
        }
    }]);

    return ExchangeButton;
}(_react2.default.Component);

exports.default = ExchangeButton;

/***/ })

});