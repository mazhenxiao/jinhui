webpackJsonp([0],{

/***/ 581:
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

var _componentNewProjectCount = __webpack_require__(607);

var _componentNewProjectCount2 = _interopRequireDefault(_componentNewProjectCount);

var _toolsDynamicTable = __webpack_require__(587);

var _toolsDynamicTable2 = _interopRequireDefault(_toolsDynamicTable);

__webpack_require__(588);

var _toolsValidate = __webpack_require__(590);

var _toolsValidate2 = _interopRequireDefault(_toolsValidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //兼容ie
//专用css


//验证字典表
/*
    pdi id   DynamicData  结构数据 CallBack 数据修改回调
  <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} /> 
 */
var NewProject = function (_React$Component) {
    _inherits(NewProject, _React$Component);

    function NewProject(arg) {
        var _arguments = arguments;

        _classCallCheck(this, NewProject);

        var _this = _possibleConstructorReturn(this, (NewProject.__proto__ || Object.getPrototypeOf(NewProject)).call(this, arg));

        _this.state = {
            newDynamicData: {}, //空数据
            DynamicData: {}, //已存在数据
            propsDATA: [], //显示数据
            pid: "",
            states: false
        };
        iss.hashHistory.listen(function (local, next) {
            console.log(_arguments);
        });
        _this.BIIND_FIST_LAND();
        return _this;
    }

    _createClass(NewProject, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "BIIND_FIST_LAND",
        value: function BIIND_FIST_LAND() {
            var THIS = this;
            if (!this.props.location || !this.props.location.state) {
                iss.Alert({ content: "请选择区域或项目！" });
            };
            var id = "A91BB3051A0848319B45D3D527AC4103"; //this.props.location.state.id;
            iss.ajax({
                url: "/Project/INewLand", //初次请求创建空地块使用
                data: { projectId: id },
                sucess: function sucess(d) {

                    if (d["rows"]) {
                        THIS.state.states = true;
                        THIS.setState({
                            newDynamicData: d["rows"]
                        });
                    }
                },
                error: function error(e) {}
            });
            iss.ajax({
                url: "/Project/IProjectLandsInfo",
                data: { projectId: id },
                sucess: function sucess(d) {
                    if (d.rows) {
                        var da = {};
                        d.rows.forEach(function (el, ind) {
                            da[el.LandId] = el;
                        });
                        THIS.setState({
                            DynamicData: da
                        }, function (arg) {
                            THIS.BIND_LAND_BTN();
                        });
                    }
                },
                error: function error() {}
            });
        }
    }, {
        key: "EVENT_CLICK_NEWLAND",
        value: function EVENT_CLICK_NEWLAND() {
            //新增地块
            var th = this,
                nd = JSON.parse(JSON.stringify(this.state.newDynamicData));
            if (this.state.states) {
                // this.DynamicData["pid"]=iss.guid();
                var guid = iss.guid();

                this.state.DynamicData[guid] = { LandId: guid, FieldList: nd }; //向数据树添加一条数据
                this.setState({
                    propsDATA: this.state.newDynamicData, //新增地块
                    pid: guid
                });
            }
        }
    }, {
        key: "EVENT_CLICK_LANDBTN",
        value: function EVENT_CLICK_LANDBTN(id, e) {
            //切换地块
            // console.log(this.state.DynamicData[id]["data"]);
            var self = $(e.target),
                pa = self.parent();
            pa.find("li").removeClass("active");
            self.addClass("active");
            this.setState({
                pid: id,
                propsDATA: this.state.DynamicData[id]["FieldList"]
            }, function (arg) {
                //  console.log(this.state.propsDATA)
            });
        }
    }, {
        key: "BIND_CALLBACK",
        value: function BIND_CALLBACK(da, e) {
            //子页面返回callback

            var el = e.target.value,
                list = this.state.DynamicData[this.state.pid];
            list.FieldList.forEach(function (d, i) {
                if (da.id == d.id) {
                    d["val"] = e.target.value;
                    return;
                }
            });
            this.setState({
                propsDATA: list.FieldList
            });
        }
    }, {
        key: "BIND_LAND_BTN",
        value: function BIND_LAND_BTN() {
            //添加新增地块button
            var map = [],
                li = this.state.DynamicData,
                name = "新增地块",
                g = 0;
            // console.log(li)
            for (var i in li) {
                g += 1;
                for (var f = 0; f < li[i].FieldList.length; f++) {
                    if (li[i].FieldList[f]["label"] == "地块名称") {
                        name = li[i].FieldList[f]["val"] || "\u65B0\u589E\u5730\u5757" + g;
                        break;
                    }
                }

                map.push(_react2.default.createElement(
                    "li",
                    { onClick: this.EVENT_CLICK_LANDBTN.bind(this, li[i].LandId), key: g, "data-id": li[i].LandId },
                    name
                ));
            }

            return map;
        }
    }, {
        key: "render",
        value: function render() {
            // console.log(JSON.stringify(this.state.DynamicData))
            return _react2.default.createElement(
                "article",
                null,
                _react2.default.createElement(_componentNewProjectCount2.default, null),
                _react2.default.createElement(
                    "section",
                    null,
                    _react2.default.createElement(
                        "h3",
                        { className: "boxGroupTit" },
                        _react2.default.createElement(
                            "p",
                            null,
                            _react2.default.createElement(
                                "span",
                                null,
                                "\u9879\u76EE\u4FE1\u606F"
                            ),
                            _react2.default.createElement(
                                "i",
                                null,
                                "\uFF08",
                                _react2.default.createElement("i", { className: "redFont" }),
                                "\u4E3A\u5FC5\u586B\u9879\uFF09"
                            )
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "functionButton" },
                            _react2.default.createElement(
                                "a",
                                { className: "approvalIcon", href: "javascript:;", onClick: this.EVENT_CLICK_NEWLAND.bind(this) },
                                "\u65B0\u589E\u5730\u5757"
                            )
                        )
                    ),
                    _react2.default.createElement("div", null),
                    _react2.default.createElement(
                        "ul",
                        { className: "BIND_LAND_BTN" },
                        this.BIND_LAND_BTN()
                    ),
                    _react2.default.createElement(_toolsDynamicTable2.default, { pid: this.state.pid, DynamicData: this.state.propsDATA, CallBack: this.BIND_CALLBACK.bind(this) })
                )
            );
        }
    }]);

    return NewProject;
}(_react2.default.Component);

exports.default = NewProject;

/***/ }),

/***/ 583:
/***/ (function(module, exports) {

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 用来处理动态生成表格
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

//兼容ie
var DynamicTable = function (_React$Component) {
    _inherits(DynamicTable, _React$Component);

    function DynamicTable(arg) {
        _classCallCheck(this, DynamicTable);

        var _this = _possibleConstructorReturn(this, (DynamicTable.__proto__ || Object.getPrototypeOf(DynamicTable)).call(this, arg));

        _this.count = 0; //初始化记录
        _this.rule = {}; //验证
        _this.id = "DynamicTable-" + iss.guid;
        _this.state = { //数据层
            url: "",
            data: _this.props.DynamicData || [], //数据
            selected: {}
        };

        return _this;
    }

    _createClass(DynamicTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            var th = this;
            //this.setState({data:this.props.DynamicData})

            /*   if (this.count == 0) {
                  this.count = 1;
                  this.BIND_INPUT_STATE();
              } */
        }
    }, {
        key: "BIND_INPUT_STATE",
        value: function BIND_INPUT_STATE() {
            var $da = this.state.data;
            $da.forEach(function (da, ind) {});
        }
    }, {
        key: "EVENT_CHANGE_DYNAMIC",
        value: function EVENT_CHANGE_DYNAMIC(d, e) {
            //自定义input事件
            if (d == null) {
                return "";
            } else {
                return d;
            }
            //   let val = e.target.value;

            //  let selected = this.state.selected;
            // this.props.CallBack(d,val)       
        }
    }, {
        key: "getPost",
        value: function getPost() {
            var th = this;
            iss.ajax({
                type: "POST",
                url: th.props.url,
                sucess: function sucess(da) {
                    var data = typeof da.data == "string" ? JSON.parse(da.data) : da.data;
                    th.setState({
                        data: da.rows
                    });
                },
                error: function error(e) {}
            });
        }
    }, {
        key: "setList",
        value: function setList(da) {
            var _this2 = this;

            // console.log(da)
            var typeBox = function typeBox(el) {

                if (el.type == "select") {
                    var list = el.data.map(function (_d, _i) {
                        return _react2.default.createElement(
                            "option",
                            { key: _i, value: _d.val },
                            _d.label
                        );
                    });
                    return _react2.default.createElement(
                        "select",
                        { name: el.id, onChange: _this2.props.CallBack.bind(_this2, el), value: el.val || "" },
                        list
                    );
                } else {
                    return _react2.default.createElement("input", { name: el.id, id: el.id, "data-pid": el.pid, value: el.val || "", placeholder: el.edit.indexOf("+m") >= 0 ? "此处为必填项" : "请输入内容", type: "text", onChange: _this2.props.CallBack.bind(_this2, el), readOnly: el.edit.indexOf("+r") >= 0 });
                }
            };

            return da.map(function (el, ind) {
                if (el.exec) {
                    var reg = /\{.*?\}/ig;
                    var arr = el.exec.match(reg);
                    if (arr) {
                        /*  arr.forEach((ee,ii)=>{
                             let gid = ee.replace(/[{}]/ig,"");
                             for(let eee = 0 ; eee<da.length;eee++){
                                 console.log(eee);
                                 if(da[eee][id]==gid){
                                     da[iii]["parent"]=da[iii]["parent"]||[];
                                     da[iii]["parent"].push(ee.id);
                                     return;
                                 }
                                 console.log("===========")
                                
                             }
                         }) */
                    }
                }
                return _react2.default.createElement(
                    "li",
                    { key: ind, className: "col-sm-4 col-md-4 col-lg-4" },
                    _react2.default.createElement(
                        "label",
                        { className: el.edit.indexOf("+m") >= 0 ? "require" : "" },
                        el.label
                    ),
                    _react2.default.createElement(
                        "i",
                        null,
                        el.unit
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        typeBox(el)
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var th = this,
                _d = this.props.DynamicData;
            return _react2.default.createElement(
                "article",
                { className: "tools-dynamicTable" },
                _react2.default.createElement(
                    "ul",
                    { className: "row" },
                    th.setList(_d)
                )
            );
        }
    }]);

    return DynamicTable;
}(_react2.default.Component);

exports.default = DynamicTable;

/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(589);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(584)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./tools-dynamicTable.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./tools-dynamicTable.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(583)(undefined);
// imports


// module
exports.push([module.i, ".tools-dynamicTable {\n  margin-top: 10px;\n}\n.tools-dynamicTable ul li {\n  height: 40px;\n  overflow: hidden;\n}\n.tools-dynamicTable ul li label {\n  font-size: 12px;\n  color: #333;\n  font-weight: normal;\n  width: 110px;\n  text-align: right;\n  padding-top: 5px;\n  float: left;\n}\n.tools-dynamicTable ul li div {\n  display: block;\n  margin: 0 65px 0 115px;\n}\n.tools-dynamicTable ul li div input {\n  width: 100%;\n  padding: 3px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li div select {\n  width: 100%;\n  height: 25px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li i {\n  font-style: normal;\n  width: 60px;\n  float: right;\n  padding-top: 3px;\n}\n.BIND_LAND_BTN {\n  padding: 10px;\n}\n.BIND_LAND_BTN li {\n  display: inline-block;\n  padding: 5px 10px;\n  border: #ddd solid 1px;\n  cursor: pointer;\n  margin: 10px;\n}\n.BIND_LAND_BTN li.active {\n  background: #e4e4e4;\n}\n", ""]);

// exports


/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    isNonEmpty: function isNonEmpty(value, errorMsg) {
        //不能为空
        if (!value.length) {
            return errorMsg;
        }
    },
    minLength: function minLength(value, length, errorMsg) {
        //大于
        if (value.length < length) {
            return errorMsg;
        }
    },
    maxLength: function maxLength(value, length, errorMsg) {
        //小于
        if (value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function isMobile(value, errorMsg) {
        //是否为手机号码
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    isEmail: function isEmail(value, errorMsg) {
        //是否为邮箱
        if (!/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(value)) {
            return errorMsg;
        }
    },
    between: function between(value, range, errorMsg) {
        //大于小于
        var min = parseInt(range.split('-')[0]);
        var max = parseInt(range.split('-')[1]);
        if (value.length < min || value.length > max) {
            return errorMsg;
        }
    },
    onlyEn: function onlyEn(value, errorMsg) {
        //纯英文
        if (!/^[A-Za-z]+$/.test(value)) {}
    },
    onlyZh: function onlyZh(value, errorMsg) {
        //纯中文
        if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
            return errorMsg;
        }
    },
    onlyNum: function onlyNum(value, errorMsg) {
        //数字包含小数
        if (!/^[0-9]+([.][0-9]+){0,1}$/.test(value)) {
            return errorMsg;
        }
    },
    onlyInt: function onlyInt(value, errorMsg) {
        //整数
        if (!/^[0-9]*$/.test(value)) {
            return errorMsg;
        }
    },
    isChecked: function isChecked(value, errorMsg, el) {
        var i = 0;
        var $collection = $(el).find('input:checked');
        if (!$collection.length) {
            return errorMsg;
        }
    }
};

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(592);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(584)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./intallment.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./intallment.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(583)(undefined);
// imports


// module
exports.push([module.i, ".clear {\n  clear: both;\n}\n.boxGroupTit {\n  height: 40px;\n  margin-bottom: 5px ;\n  position: relative;\n  margin-top: 0;\n}\n.boxGroupTit p {\n  height: 40px;\n  line-height: 40px;\n  color: #333333;\n  font-size: 14px;\n  border-bottom: 1px solid #c9c9c9;\n}\n.boxGroupTit p span {\n  display: inline-block;\n  line-height: 40px;\n  border-bottom: 2px solid #31395d;\n}\n.boxGroupTit p i {\n  font-style: normal;\n}\n.boxGroupTit span.functionButton {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: auto;\n  text-align: right;\n}\n.boxGroupTit span.functionButton a {\n  font-size: 12px;\n  height: 40px;\n  line-height: 40px;\n  display: inline-block;\n  padding-left: 20px;\n  padding-right: 20px;\n  color: #999999 !important;\n  background-repeat: no-repeat;\n  background-position: left center;\n}\n.boxGroupTit span.functionButton a:hover {\n  color: #31395d;\n}\n.boxGroupTit span.functionButton .refresh-icon {\n  background-image: url(" + __webpack_require__(593) + ");\n}\n.boxGroupTit span.functionButton .refresh-icon:hover {\n  background-image: url(" + __webpack_require__(594) + ");\n}\n.boxGroupTit span.functionButton .saveIcon {\n  background-image: url(" + __webpack_require__(595) + ");\n}\n.boxGroupTit span.functionButton .saveIcon:hover {\n  background-image: url(" + __webpack_require__(596) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon {\n  background-image: url(" + __webpack_require__(597) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon:hover {\n  background-image: url(" + __webpack_require__(598) + ");\n}\n.staging-left,\n.staging-right {\n  float: left;\n}\n.projectinFormation {\n  width: 66.6%;\n  height: auto;\n  margin-top: 10px;\n  padding-right: 20px;\n}\n.fieldLocation {\n  margin-top: 10px;\n  width: 33.3%;\n  height: 295px;\n  border: 1px solid #dddddd;\n}\n.carouselStyle .left,\n.carouselStyle .right {\n  background: none;\n}\n.carouselStyle .carousel-control {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  top: 50%;\n  margin-top: -15px;\n  background: #F1A118;\n}\n.carouselStyle .carousel-control:hover {\n  opacity: 0.8;\n}\n", ""]);

// exports


/***/ }),

/***/ 593:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABO0lEQVQ4T6VSsXHDMAwkWLBOJohG8AbRBrE3sBrxWNnZQNlAHUk1zgbWBlEmiD1Bkg3USgWQg45y7Fgn5s4sCeDx/3gQNz6Ymt/tdnd932+IaA0ASehpiagmohdjzNc4dwVQVdWCiN6I6J2ISmNMw838j4gMuEHEzBjzyv8XANbaREr5gYjPY8NfhmEBg6611vUFgPeeC43WupizxlqbSilrpVRyAgjbP5VS91mWtTFvnXMHlngOwKiF1jqNDXPdez+whKDpiYh4MAEANufI+uaAAkA6MAjaH8PAt1JqEZPhnCsBoB0A+O5d1zV8cwBI8zw/xGSwBwBQnDwIUpIY9cB4K4TYaq1/rxDbONa990smjYgrDtlklKfCg4gPQoglAKzGEF0lcYpF2LgnoiMAcHjKc4P/xWBO3s0AP2hInl/EMUEDAAAAAElFTkSuQmCC"

/***/ }),

/***/ 594:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4T6WTgQ0BQRBFnw6ogBJ0QAfogArQAR3ogA7oABWgAnRwJcjb7CbncmcvMcnmkt2ZN//P7nX4MzoN9V1gCcyBQcwpgBOwBV6prg4wBM7AFdgBl5jsvkDBC+DgfhVgtxuwTgk1CgUJFXaqAjxwbTKjGUc7gzLA7k+gB+g3F3ctlgFS7ey3TQSVAvQ0iYWqcDiPKPEXKDRLCvQ9itnvCM3Z8IaKBPDehahAC/rLhTmb8gy0IsDHkosV4Pq6hVxROp8Ce2Cm6qanXIWprg9YbGF4RHUvsU6FRcfSzYTh/foX2loJeW0tNEI/qngqkZ/g9CsAAAAASUVORK5CYII="

/***/ }),

/***/ 595:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+ElEQVQ4T92TMY6DQAxFxyMx7XKE3GBzg+QoocGaLkfgCHTINHAU9ga7N8gRSOvCXnmUWa0iEEmTIi5Ag/0fxnyDu0Xf93vn3Ec+b9yvdV1/Ww3YhYjOqnoCgPkmnFYAR3uuqqWqtjHGMQPmEMKOmc9WgIjNf4B1VxTFJedDCC0zXxCxzABFRCCiJLwHENEkIo33PnVgeSJKmpcBGhEZvfenrQ5sBgcAaJeGqKqW/0LEdvEThmEomdneUq78BRv2WFXVvAh40AOp7A0Bs7nqyRkkTTaSOfDTOZcW5IGwxfsxRyaARdd1x2zVLYCITDHGtHB/gC3RWv4XGt+9Eawr3zcAAAAASUVORK5CYII="

/***/ }),

/***/ 596:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABC0lEQVQ4T92TQUrEQBBFfzFBxpU5gjewXQjJyjnHkECOkCN4hBwhkOA54moCLqa9wRyhXTlghi/VSUSwGePGhbXopqn6j+ruX4IpzN3WSLS6ms/ndg6nV/v8aLVGdDFpXgpZEOJGIbswQDajiDEhle2b2gNuk8zxGF1jPZR6tn378BWg3eH94jDncYwqWQ+Hfd/GIyDNud81YpLMC78BkrwDqDnfgeZnzV8BtLOhBqLifAdpXgK8F0gVekSCJSBPdtdU4SuYIsblqQAZB39BxOFtVVtbuyBgiQfmmn8HSDKnrvrVG0yacRbUgYIbEH5AfgyBAfGijvSACaI29VZdEJ3tWz9wn4AFomDJB58qtRFyLtVBAAAAAElFTkSuQmCC"

/***/ }),

/***/ 597:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4T6WTzXHCQAyFn/bAcAsdxCW4BHcQSogvaH0jHZAOuBlxASoIqSDuAHcQ0gE5cmCVkcdmjDFkMtnbrqRPTz9L+OehvngRmarqExHFqlqq6muWZUWf7xVARGYAosFgME3T9LBcLuMQwpqIZsy87UIuAKvVanQ8Hgvvfdx2zPM8cs4VzBzdBeR5nhDR2Hs/7TqKiDLzleKLB8tERNsbCkpmHt1VYMbFYrElok9mfrF7Lf8NwIaZ578CrGmq+gFgpKp7IopU9d17P24Bd6q6sVIvSqgn8AxgHkIom2zD4bBsJnI6nWLnXAIgsaaeASKytoBmfF2pbWUhhBRAkWXZvgJY951zNmcjX512MIBvIkomk0mlsALUjVv3Lcq94DNARPZ9S2IOZgPw2M3cyKwU3FqSOvsOwJctWCO7XWMDOAB4aBts62wH7M2adevT9v7Gv/zwH4PhtBGvNQeUAAAAAElFTkSuQmCC"

/***/ }),

/***/ 598:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4T6WTzU3DQBCF3+BF4oY7wCVsDpHsmzsgxyhypNBB6MB0kBIc2ULcCBXg21ri4O2A0EG4RSJk0Do/bJwlCOGbtTPfvJl5Q/jnR658GQ3HYL4GkQSzBnCnq6J0xR4BZJikAAIsxVjrbCG7A0neWcaEVKti1oYcAKQc+XSxKuuqkHagDPsBkShrVQSnAWESg9DTqhi3AzvRkGuVHyk+VGAqQcycCiB0XRX+SQXmUUZD0+erVvlt8x/2A5B4BGiqVT75HdAdSAjvmQCfGXMiBAw8aZX3voHnNcBT02qrhSQlwohBk+36NgWXQu82As+TAMdEiM1Q9wAZJtk2uFlfW6pZp6XsBvgodfUwbwDSTB+U6iqPncayksH8zp/rWL/cG4NhA2gGx5nLKHbldvIe0ImSucskJsC8AXTlSrYAbpM0Nhaemfgbr9a9nWy7zaaFTpgsQHRpPxjXNR4AYIb109E6r/EvF/4FXk6sEdl++K0AAAAASUVORK5CYII="

/***/ }),

/***/ 607:
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//兼容ie
__webpack_require__(591);

var NewProjectCount = function (_React$Component) {
    _inherits(NewProjectCount, _React$Component);

    function NewProjectCount(arg) {
        var _arguments = arguments;

        _classCallCheck(this, NewProjectCount);

        var _this = _possibleConstructorReturn(this, (NewProjectCount.__proto__ || Object.getPrototypeOf(NewProjectCount)).call(this, arg));

        _this.state = {
            "PROJECTNAME": "",
            "CASENAME": "",
            "PROJECTADDRESS": "",
            "TRADERMODE": "",
            "belongCity": "",
            "PROJECTTYPE": "",
            "companyHead": "",

            "EQUITYRATIO": "",
            "PROJECTCODE": "",
            "PRINCIPAL": ""

        };
        iss.hashHistory.listen(function (local, next) {
            console.log(_arguments);
        });

        return _this;
    }

    _createClass(NewProjectCount, [{
        key: "getAjax",
        value: function getAjax() {
            var th = this;
            // console.log(th);
            //   let projectId = this.props.location.state.id;
            //console.log(this.props.location)
            iss.ajax({
                type: "post",
                url: "/Project/IProjectInfo",
                data: {
                    projectId: "A91BB3051A0848319B45D3D527AC4103"
                },
                sucess: function sucess(res) {
                    console.log(res.rows);
                    console.log(res.rows.SelectOptions.TRADERMODE);
                    th.setState({
                        "PROJECTNAME": res.rows.BaseFormInfo.PROJECTNAME,
                        "CASENAME": res.rows.BaseFormInfo.CASENAME,
                        "EQUITYRATIO": res.rows.BaseFormInfo.EQUITYRATIO,
                        "PROJECTCODE": res.rows.BaseFormInfo.PROJECTCODE,
                        "PRINCIPAL": res.rows.BaseFormInfo.PRINCIPAL,
                        "PROJECTADDRESS": res.rows.BaseFormInfo.PROJECTADDRESS,
                        "PROJECTTYPE": res.rows.BaseFormInfo.PROJECTTYPE,

                        // this.state.PROJECTTYPE
                        "TRADERMODE": res.rows.BaseFormInfo.TRADERMODE
                    }, function (arg) {
                        console.log(th.state);
                        th.bind_combobox(res);
                    });
                },
                error: function error(e) {}
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getAjax();
            // this.bind_combobox();
        }
    }, {
        key: "handChooseTo",
        value: function handChooseTo(ev, da) {
            iss.chooseTo({
                url: "/Home/GetTreeInfo",
                title: "选择人员",
                pepole: {}, //已选人员名单
                callback: function callback(da) {
                    // console.log(da);
                }
            });
        }
    }, {
        key: "handleInputTextChange",
        value: function handleInputTextChange(e) {
            var th = this;
            var target = e.target.id;
            this.setState(_defineProperty({}, target, e.target.value), function () {
                //console.log(this.state) 
            });
            //console.log(e.target.id);
            //console.log(e.target.value);
        }
    }, {
        key: "handleSelectTextChange",
        value: function handleSelectTextChange(e, b, c) {
            this.setState(_defineProperty({}, e, b));
            // console.log(this.state);
        }
    }, {
        key: "bind_combobox",
        value: function bind_combobox(arg) {
            var th = this;
            var belongCity = this.belongCity = $("#belongCity"); //所属城市
            console.log(arg);
            // return;
            belongCity.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "belongCity"),
                data: [{ label: "请选择", val: "", "selected": true }, { label: "北京", val: "0" }, { label: "上海", val: "1" }, { label: "广州", val: "2" }]
            });
            var developmentWay = $("#PROJECTTYPE"); //项目开发方式
            developmentWay.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "PROJECTTYPE"),
                data: arg.rows.SelectOptions.PROJECTTYPE,
                select: arg.rows.BaseFormInfo.PROJECTTYPE
            });
            developmentWay.combobox("select", arg.rows.BaseFormInfo.PROJECTTYPE);

            var tradersWay = $("#TRADERMODE"); //操盘方式
            tradersWay.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "TRADERMODE"),
                data: arg.rows.SelectOptions.TRADERMODE

            });
            tradersWay.combobox("select", arg.rows.BaseFormInfo.TRADERMODE);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "section",
                null,
                _react2.default.createElement(
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
                                "\u9879\u76EE\u4FE1\u606F"
                            ),
                            _react2.default.createElement(
                                "i",
                                null,
                                "\uFF08",
                                _react2.default.createElement("i", { className: "redFont" }),
                                "\u4E3A\u5FC5\u586B\u9879\uFF09"
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
                                            "\u6240\u5C5E\u533A\u57DF"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing" },
                                            "\u57CE\u5E02\u516C\u53F8"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                            "\u6240\u5C5E\u57CE\u5E02"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { type: "text", id: "belongCity" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing" },
                                            "\u83B7\u53D6\u72B6\u6001"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement(
                                            "p",
                                            { id: "OBTAINTSTATUS" },
                                            "\u62DF\u83B7\u53D6/\u5DF2\u83B7\u53D6"
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
                                            "\u9879\u76EE\u540D\u79F0"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { onChange: this.handleInputTextChange.bind(this), id: "PROJECTNAME", value: this.state.PROJECTNAME, className: "inputTextBox boxSizing", type: "text" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing redFont" },
                                            "\u9879\u76EE\u6848\u540D"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { onChange: this.handleInputTextChange.bind(this), id: "CASENAME", value: this.state.CASENAME, className: "inputTextBox boxSizing", type: "text" })
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
                                            "\u6743\u76CA\u6BD4\u4F8B"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", id: "EQUITYRATIO", value: this.state.EQUITYRATIO, className: "inputTextBox inputGray boxSizing", type: "text" }),
                                        _react2.default.createElement(
                                            "i",
                                            { className: "symbol" },
                                            "%"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing" },
                                            "\u9879\u76EE\u7F16\u53F7"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", id: "PROJECTCODE", value: this.state.PROJECTCODE, className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                            "\u9879\u76EE\u5F00\u53D1\u65B9\u5F0F"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { type: "text", id: "PROJECTTYPE" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing redFont" },
                                            "\u5730\u7406\u4F4D\u7F6E"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btnStyle uploadIconBtn", id: "LOCATION" },
                                            "\u6807\u8BB0\u5730\u7406\u4F4D\u7F6E"
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
                                            "\u64CD\u76D8\u65B9\u5F0F"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { type: "text", id: "TRADERMODE" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement(
                                            "label",
                                            { className: "formTableLabel boxSizing redFont" },
                                            "\u9879\u76EE\u603B\u56FE"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btnStyle uploadIconBtn" },
                                            "\u4E0A\u4F20"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btnStyle userApplyIconBtn" },
                                            "\u7F16\u8F91"
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
                                            "\u9879\u76EE\u8D1F\u8D23\u4EBA"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement("input", { readOnly: "readonly", onClick: this.handChooseTo.bind(this), onChange: this.handleInputTextChange.bind(this), id: "PRINCIPAL", value: this.state.PRINCIPAL, className: "inputTextBox boxSizing", type: "text" }),
                                        _react2.default.createElement("img", { className: "symbol headIcon", src: "../../Content/img/head-icon.png" })
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        null,
                                        _react2.default.createElement("label", { className: "formTableLabel boxSizing" })
                                    ),
                                    _react2.default.createElement("td", null)
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
                                            "\u9879\u76EE\u5730\u5740"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { colSpan: "3" },
                                        _react2.default.createElement("input", { onChange: this.handleInputTextChange.bind(this), id: "PROJECTADDRESS", value: this.state.PROJECTADDRESS, className: "inputTextBox boxSizing", type: "text" })
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
                            { id: "myCarousel", className: "carousel slide carouselStyle" },
                            _react2.default.createElement(
                                "div",
                                { className: "carousel-inner" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "item active" },
                                    _react2.default.createElement("iframe", { src: "", width: "100%", height: "295px" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "item" },
                                    _react2.default.createElement("iframe", { src: "", width: "100%", height: "295px" })
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
                )
            );
        }
    }]);

    return NewProjectCount;
}(_react2.default.Component);

exports.default = NewProjectCount;

/***/ })

});