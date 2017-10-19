webpackJsonp([0],{

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(65);

__webpack_require__(79);

var _componentNewProjectCount = __webpack_require__(646);

var _componentNewProjectCount2 = _interopRequireDefault(_componentNewProjectCount);

var _toolsDynamicTable = __webpack_require__(615);

var _toolsDynamicTable2 = _interopRequireDefault(_toolsDynamicTable);

__webpack_require__(616);

var _componentNewProjectApprovalNode = __webpack_require__(619);

var _componentNewProjectApprovalNode2 = _interopRequireDefault(_componentNewProjectApprovalNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //兼容ie
//专用css


//审批信息

/*
    pdi id   DynamicData  结构数据 CallBack 数据修改回调
  <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} /> 
 */
var NewProject = function (_React$Component) {
    _inherits(NewProject, _React$Component);

    function NewProject(arg) {
        _classCallCheck(this, NewProject);

        var _this = _possibleConstructorReturn(this, (NewProject.__proto__ || Object.getPrototypeOf(NewProject)).call(this, arg));

        _this.state = {
            newDynamicData: {}, //空数据
            DynamicData: {}, //已存在数据
            propsDATA: [], //显示数据
            CountData: [], //统计
            pid: "",
            states: false,
            countText: "统计数据过期",
            NewProjectCountDATA: {}, //基础数据
            status: "show"
        };
        _this.guid = iss.guid();
        iss.hashHistory.listen(function (local, next) {
            //console.log(arguments)
        });
        _this.BIIND_FIST_LAND(); //获取地块信息
        _this.time = ""; //延时变量
        _this.firstData = []; //初始化数据
        _this.child1 = ""; //子集指针
        return _this;
    }

    _createClass(NewProject, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var local = this.props.location;
            if (local.query["status"]) {
                this.setState({ status: this.props.location.query.status });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "BIND_NewProjectCountDATA",
        value: function BIND_NewProjectCountDATA(data) {
            //NewProjectCountDATA={this.BIND_NewProjectCountDATA.bind(this)}

            this.setState({
                NewProjectCountDATA: data
            });
        }
    }, {
        key: "BIIND_FIST_LAND",
        value: function BIIND_FIST_LAND() {
            //获取已有地块
            if (iss.id == "") {
                return;
            }
            var THIS = this;
            var id = iss.id.id; //"A91BB3051A0848319B45D3D527AC4103" //this.props.location.state.id;
            iss.ajax({
                url: "/Project/INewLand", //初次请求创建空地块使用
                data: { projectId: id },
                success: function success(d) {
                    if (d["rows"]) {
                        THIS.state.states = true;
                        THIS.setState({
                            newDynamicData: JSON.stringify(d["rows"])
                        });
                    }
                },
                error: function error(e) {}
            });
            iss.ajax({ //获取已有地块
                url: "/Project/IProjectLandsInfo",
                data: { projectId: id },
                success: function success(d) {
                    if (d.rows) {
                        var da = {};
                        d.rows.forEach(function (el, ind) {
                            if (ind == 0) {
                                //初次加载地块

                                THIS.setState({
                                    propsDATA: el["FieldList"]
                                });
                            }
                            da[el.LandId] = el;
                        });

                        THIS.setState({
                            DynamicData: da
                        }, function (arg) {
                            THIS.BIND_LAND_BTN();
                        });
                        console.log(da);
                    }
                },
                error: function error() {}
            });
            //Project/ILandsStatistics  土地动态统计
            iss.ajax({
                url: "/Project/ILandsStatistics",
                success: function success(a) {

                    if (a["rows"]) {
                        THIS.setState({
                            CountData: a["rows"]
                        }, function (arg) {
                            setTimeout(function (arg) {

                                THIS.BIND_COUNT_GETMAP();
                            }, 2000);
                        });
                    }
                }
            });
        }
    }, {
        key: "EVENT_CLICK_NEWLAND",
        value: function EVENT_CLICK_NEWLAND() {
            //新增地块
            var th = this,
                nd = JSON.parse(this.state.newDynamicData);
            if (this.state.states) {
                // this.DynamicData["pid"]=iss.guid();
                var guid = iss.guid();

                this.state.DynamicData[guid] = { LandId: guid, FieldList: nd }; //向数据树添加一条数据
                this.setState({
                    propsDATA: nd, //新增地块
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
            if (self.hasClass("icon-delete")) {
                return;
            }
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
        key: "SET_PARENTCOUNT",
        value: function SET_PARENTCOUNT(list, d) {
            //地块计算
            var da = {};
            var data = list.forEach(function (el, ind) {
                for (var i in d.parent) {
                    if (el.id == i) {
                        var _ret = function () {
                            var exec = el.exec;
                            var reg = /{.*?}/ig;
                            var arr = exec.match(reg);
                            if (arr) {
                                arr.forEach(function (ee, ii) {
                                    var regs = new RegExp("" + ee, "ig");
                                    exec = exec.replace(regs, ~~el.child[ee.replace(/[{}]/ig, "")].val);
                                });
                                el.val = eval(exec);
                                return {
                                    v: void 0
                                };
                            }
                        }();

                        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                    }
                }
            });
            return;
        }
    }, {
        key: "BIND_CALLBACK",
        value: function BIND_CALLBACK(da, e) {
            //子页面返回callback
            // if(this.time){ clearTimeout(this.time) }
            var th = this;
            var el = e ? e.target.value : da.val,
                list = this.state.DynamicData[this.state.pid];
            list.FieldList.forEach(function (d, i) {
                if (da.id == d.id) {
                    d["val"] = el; //e.target.value; 
                    if (d["parent"]) {
                        th.SET_PARENTCOUNT(list.FieldList, d);
                    }
                    return;
                }
            });
            this.setState({
                propsDATA: list.FieldList
            });

            // th.time=setTimeout(arg=>{
            th.BIND_COUNT_GETMAP();
            //},1000);
        }
    }, {
        key: "BIND_VALID_DATA",
        value: function BIND_VALID_DATA() {
            //地块数据检查
            var th = this,
                valid = true;
            var list = th.state.DynamicData,
                str = "";
            for (var i in list) {
                list[i]["FieldList"].forEach(function (el, ind) {
                    if (el["edit"].indexOf("+m") >= 0 && !el["val"]) {
                        valid = false;
                        return;
                    }
                });
            }
            return valid;
        }
    }, {
        key: "EVENT_CLICK_DELETE",
        value: function EVENT_CLICK_DELETE(id, ev) {
            //删除地块
            var data = this.state.DynamicData;
            var th = this;
            iss.Alert({
                title: "提示",
                width: 300,
                content: "<div class=\"Alert\">\u662F\u5426\u5220\u9664\u5730\u5757</div>",
                ok: function ok() {
                    delete data[id];
                    var fda = [],
                        iii = 0,
                        _id = "";
                    for (var v in data) {
                        if (iii == 1) {
                            break;
                        }
                        fda = data[v]["FieldList"];
                        _id = data[v]["LandId"];
                        iii += 1;
                    }

                    th.setState({
                        DynamicData: data,
                        propsDATA: fda,
                        pid: _id
                    }, function (arg) {
                        th.BIND_COUNT_GETMAP();
                    });
                },
                cancel: function cancel() {}
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
                    name,
                    _react2.default.createElement("span", { className: "icon-delete", onClick: this.EVENT_CLICK_DELETE.bind(this, li[i].LandId) })
                ));
            }

            return map;
        }
    }, {
        key: "BIND_COUNT_DATACALLBACK",
        value: function BIND_COUNT_DATACALLBACK(da) {//地块统计

        }
    }, {
        key: "EVENT_CLICK_REFASH",
        value: function EVENT_CLICK_REFASH() {//刷新
            //this.BIND_COUNT_GETMAP(); //重新统计数据
        }
    }, {
        key: "BIND_COUNT_GETMAP",
        value: function BIND_COUNT_GETMAP() {
            //地块统计
            var da = this.state.CountData,
                th = this;
            //   var t = new Date().getTime();
            da.forEach(function (el, ind) {
                var reg = /\{.*?\}[\+\-\*\/]/,
                    regcount = /\{.*?\}/ig,
                    arr = regcount.exec(el.exec || ""),
                    list = th.state.DynamicData;
                var reg2 = /\<.*?\>[\+\-\*\/]/,
                    regcount2 = /\<.*?\>/ig,
                    arr2 = el.exec.match(regcount2),
                    list2 = th.state.CountData;
                if (el.exec && !reg.exec(el.exec)) {
                    if (arr && arr[0]) {
                        var _ret2 = function () {
                            var _id = arr[0].replace(/[{}]/ig, ""),
                                _str = [];
                            for (var v in list) {
                                list[v]["FieldList"].forEach(function (ee, ii) {
                                    if (ee["id"] == _id) {
                                        _str.push(~~ee["val"]);
                                        return;
                                    }
                                });
                            }
                            var n_n = eval(_str.join("+"));
                            el.val = n_n == Infinity ? 0 : n_n;
                            return {
                                v: void 0
                            };
                        }();

                        if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
                    } else if (el.exec && reg2.exec(el.exec)) {
                        var str = el.exec,
                            nums = 0;
                        arr2.forEach(function (ee, ii) {
                            var _id_ = ee.replace(/[\<\>]/ig, "");
                            list2.forEach(function (eee, iii) {
                                if (eee.id == _id_) {
                                    str = str.replace(ee, ~~eee.val);
                                }
                            });
                        });
                        var _n_n_ = eval(str);
                        el.val = _n_n_ == Infinity || !_n_n_ ? 0 : _n_n_;
                        return;
                    }
                }
            });
            th.setState({
                CountData: da
            });
            /*  var t2 = (new Date().getTime()-t)/1000;
             console.log(t2) */
        }
    }, {
        key: "EVENT_CLICK_POSTAPP",
        value: function EVENT_CLICK_POSTAPP() {
            //发起审批基础部分
            var th = this;
            var landInfoListJson = th.GET_DynamicData();

            iss.ajax({
                type: "POST",
                url: "/Project/ISave",
                data: {
                    projectJson: JSON.stringify(this.state.NewProjectCountDATA),
                    landInfoListJson: landInfoListJson,
                    editType: "Submit"
                },
                success: function success(data) {
                    if (data.errno == 0) {
                        //do something 
                    } else {
                        console.log("1");
                    }
                },
                error: function error(er) {
                    console.log('错误');
                }
            });
        }
    }, {
        key: "BIND_SUBMITPRIMISE",
        value: function BIND_SUBMITPRIMISE() {
            BIND_ROUTERCHANGE(); //路由跳转
        }
    }, {
        key: "GET_DynamicData",
        value: function GET_DynamicData() {
            var landInfoListJson = [],
                th = this;
            for (var vv in th.state.DynamicData) {
                landInfoListJson.push({
                    "LandId": vv, "FieldList": th.state.DynamicData[vv]["FieldList"].map(function (el, ind) {
                        delete el["parent"];
                        delete el["child"];
                        return el;
                    })
                });
            }
            return JSON.stringify(landInfoListJson);
        }
    }, {
        key: "GET_projectNameCheck",
        value: function GET_projectNameCheck() {//检查是重复名称

        }
    }, {
        key: "EVENT_CLICK_SAVE",
        value: function EVENT_CLICK_SAVE(callback) {
            //暂存
            var th = this;
            var landInfoListJson = th.GET_DynamicData();

            if (th.state.NewProjectCountDATA.PROJECTNAME) {
                if (!iss.getQuert("edit") && !th.state.NewProjectCountDATA.checkName) {
                    iss.popover({ content: "项目名称已存在请重新填写！" });return;
                }
                iss.ajax({
                    type: "POST",
                    url: "/Project/ISave",
                    data: {
                        projectJson: JSON.stringify(th.state.NewProjectCountDATA),
                        landInfoListJson: landInfoListJson,
                        editType: "Save"
                    },
                    success: function success(d) {
                        if (typeof callback == "function") {
                            callback();
                        };
                        iss.popover({
                            content: "保存成功",
                            type: 2
                        });
                        $(window).trigger("treeLoad");
                        if (d.errno == 0) {
                            //do something 
                        } else {
                            console.log("1");
                        }
                    },
                    error: function error(e) {
                        console.log('错误');
                    }
                });
            } else {
                iss.popover({
                    content: "请输入项目名称！"
                });
            }
        }
    }, {
        key: "BIND_ApprovalControlNode",
        value: function BIND_ApprovalControlNode(self) {
            //流程绑定回调
            this.NewProjectCount = self;
            this.BIND_ApprovalControlNode_EVENT = self.EVENT_CLICK_SUBMIT.bind(self); //绑定子集数据
        }
    }, {
        key: "BIND_ApprovalControlNode_EVENT",
        value: function BIND_ApprovalControlNode_EVENT() {//流程提交,重定向到审批流程

        }
    }, {
        key: "GET_CHECKED",
        value: function GET_CHECKED() {
            //验证项目名称重复
            if (!this.state.NewProjectCountDATA.checkName) {
                iss.popover({
                    content: "项目名称重复请更正。"
                });
                return false;
            }
            /* if (!this.BIND_SELF_NewProjectCount()) {//验证基础数据
                iss.popover({
                    content: "请完善项目信息必填项（*为必填项）。"
                })
                return false;
            }; */
            if (!this.BIND_VALID_DATA()) {
                //验证地块
                iss.popover({ content: "请完善地块数据" });
                return false;
            }
            return true;
        }
    }, {
        key: "BIND_ROUTERCHANGE",
        value: function BIND_ROUTERCHANGE() {
            //发起审批

            if (this.GET_CHECKED()) {
                return;
                this.EVENT_CLICK_POSTAPP(); //基础信息提交
                this.BIND_ApprovalControlNode_EVENT(); //流程提交
            }

            // iss.hashHistory.push({pathname:"/newProjectApproval",state:iss.id});
        }
    }, {
        key: "BIND_NewProjectCount",
        value: function BIND_NewProjectCount(self) {
            //父级重定向到子集
            this.child1 = self;
            this.BIND_SELF_NewProjectCount = self.BIND_VALID.bind(self);
        }
    }, {
        key: "BIND_SELF_NewProjectCount",
        value: function BIND_SELF_NewProjectCount() {//重定向

        }
    }, {
        key: "render",
        value: function render() {
            // console.log(JSON.stringify(this.state.DynamicData))
            return _react2.default.createElement(
                "article",
                null,
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
                                { className: "saveIcon ", onClick: this.EVENT_CLICK_SAVE.bind(this), href: "javascript:void(0);" },
                                "\u6682\u5B58"
                            ),
                            _react2.default.createElement(
                                "a",
                                { className: "approvalIcon", onClick: this.BIND_ROUTERCHANGE.bind(this), href: "javascript:;" },
                                "\u53D1\u8D77\u5BA1\u6279"
                            )
                        )
                    ),
                    _react2.default.createElement(_componentNewProjectCount2.default, { local: this.props.location, NewProjectCountDATA: this.BIND_NewProjectCountDATA.bind(this), save: this.EVENT_CLICK_SAVE.bind(this), point: this.BIND_NewProjectCount.bind(this) })
                ),
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
                                "\u5730\u5757\u4FE1\u606F"
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
                                { className: "addDik-icon", href: "javascript:;", onClick: this.EVENT_CLICK_NEWLAND.bind(this) },
                                "\u65B0\u589E\u5730\u5757"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_toolsDynamicTable2.default, { pid: "countdata", DynamicData: this.state.CountData, CallBack: this.BIND_COUNT_DATACALLBACK.bind(this) })
                    ),
                    _react2.default.createElement(
                        "ul",
                        { className: "BIND_LAND_BTN" },
                        this.BIND_LAND_BTN()
                    ),
                    _react2.default.createElement(_toolsDynamicTable2.default, { pid: this.state.pid, DynamicData: this.state.propsDATA, CallBack: this.BIND_CALLBACK.bind(this) })
                ),
                _react2.default.createElement(
                    "section",
                    { style: { "display": "none" } },
                    _react2.default.createElement(_componentNewProjectApprovalNode2.default, { guid: this.guid, type: "edit", callback: this.BIND_ApprovalControlNode.bind(this) })
                )
            );
        }
    }]);

    return NewProject;
}(_react2.default.Component);

exports.default = NewProject;

/***/ }),

/***/ 607:
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

/***/ 608:
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

var	fixUrls = __webpack_require__(610);

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

/***/ 610:
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

/***/ 615:
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
        key: "setEventDate",
        value: function setEventDate(el, ev) {
            var th = this;
            var de = new Date().Format("yyyy-MM-dd");
            var event = ev.target;
            iss.calendar(de, function (arg) {
                el.val = arg;
                th.props.CallBack.call(th, el);
                if (el.val) {
                    event.className = event.className.replace("required", "");
                } else if (el.edit.indexOf("+m") >= 0) {
                    event.className += " required";
                }
            });
        }
    }, {
        key: "Valid",
        value: function Valid() {
            /*     var str = "";
                this.props.DynamicData.forEach((el, ind) => {
                    //if(el.)
                }) */
        }
    }, {
        key: "EVENT_CHANGE_INPUT",
        value: function EVENT_CHANGE_INPUT(da, ev) {
            //input修改
            var th = this;

            if (th.Bind_checked(da, ev.target.value)) {
                th.props.CallBack(da, ev);
            }

            if (da.val) {
                ev.target.className = ev.target.className.replace("required", "");
            } else if (da.edit.indexOf("+m") >= 0) {
                ev.target.className += " required";
            }
            this.Valid();
        }
    }, {
        key: "EVENT_CHANGE_SELECT",
        value: function EVENT_CHANGE_SELECT(da, ev) {
            this.props.CallBack(da, ev);
        }
    }, {
        key: "Bind_checked",
        value: function Bind_checked(da, val) {
            //检测数据
            var reg = eval("(" + da.regExp + ")");
            if (reg && reg.type.indexOf("number") >= 0) {
                var regs = /\d/,
                    num = /\d+/.exec(reg.type);
                if (reg["max"]) {//范围限制带添加

                }
                if (num) {
                    return !new RegExp("\\.\\d{" + (parseInt(num[0]) + 1) + "}").test(val);
                }
                return val == "" ? true : regs.test(val);
            }
            return true;
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
                        { name: el.id, className: el.edit.indexOf("+m") >= 0 ? "required" : "", onChange: _this2.EVENT_CHANGE_SELECT.bind(_this2, el), value: el.val || "" },
                        list
                    );
                } else if (el.type == "date") {
                    return _react2.default.createElement("input", { name: el.id, className: el.edit.indexOf("+m") >= 0 ? "esayuiDate required" : "esayuiDate", id: el.id, "data-pid": el.pid, value: el.val || "", placeholder: el.edit.indexOf("+m") >= 0 ? "必填" : "", type: "text", onClick: _this2.setEventDate.bind(_this2, el), readOnly: "true" });
                } else {

                    return _react2.default.createElement("input", { name: el.id, id: el.id, className: el.edit.indexOf("+m") >= 0 ? "esayuiDate required" : "esayuiDate", "data-pid": el.pid, value: el.val || "", placeholder: el.edit.indexOf("+m") >= 0 ? "必填" : "", type: "text", onChange: _this2.EVENT_CHANGE_INPUT.bind(_this2, el), readOnly: el.edit.indexOf("+r") >= 0 });
                }
            };

            return da.map(function (el, ind) {
                if (el.exec) {
                    var reg = /\{.*?\}/ig;
                    var arr = el.exec.match(reg);

                    if (arr) {
                        var child = {};
                        arr.forEach(function (ee, ii) {
                            var gid = ee.replace(/[{}]/ig, "");
                            for (var eee = 0; eee < da.length; eee++) {

                                if (da[eee]["id"] == gid) {
                                    da[eee]["parent"] = da[eee]["parent"] || {};
                                    da[eee]["parent"][el.id] = el.id;
                                    child[gid] = child[gid] || {};
                                    child[gid] = da[eee];
                                    break;
                                }
                            }
                        });
                        el["child"] = child;
                        //  console.log(da);
                    }
                }
                var classNames = el["colspan"] ? "col-sm-" + el["colspan"] + " col-md-" + el["colspan"] + " col-lg-" + el["colspan"] : "col-sm-4 col-md-4 col-lg-4";
                return _react2.default.createElement(
                    "li",
                    { key: ind, className: classNames },
                    _react2.default.createElement(
                        "label",
                        { className: el.edit.indexOf("+m") >= 0 ? "require" : "" },
                        el.label
                    ),
                    el.type == "date" ? _react2.default.createElement("i", { className: "date" }) : _react2.default.createElement(
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

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(617);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(608)(content, options);
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

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(607)(undefined);
// imports


// module
exports.push([module.i, ".tools-dynamicTable {\n  margin-top: 10px;\n}\n.tools-dynamicTable ul li {\n  height: 40px;\n  overflow: hidden;\n}\n.tools-dynamicTable ul li label {\n  font-size: 12px;\n  color: #333;\n  font-weight: normal;\n  width: 110px;\n  text-align: right;\n  padding-top: 5px;\n  float: left;\n}\n.tools-dynamicTable ul li div {\n  display: block;\n  margin: 0 65px 0 115px;\n}\n.tools-dynamicTable ul li div input {\n  width: 100%;\n  padding: 3px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li div input[readonly] {\n  background: #fbfbfb;\n}\n.tools-dynamicTable ul li div input.required {\n  background: #fff3f3;\n}\n.tools-dynamicTable ul li div select {\n  width: 100%;\n  height: 25px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li i {\n  font-style: normal;\n  width: 60px;\n  float: right;\n  padding-top: 3px;\n}\n.tools-dynamicTable ul li i.date {\n  display: inline-block;\n  height: 30px;\n  background: url(" + __webpack_require__(618) + ") no-repeat 3px 50%;\n}\n.BIND_LAND_BTN {\n  padding: 10px;\n}\n.BIND_LAND_BTN li {\n  display: inline-block;\n  padding: 5px 10px;\n  border: #ddd solid 1px;\n  cursor: pointer;\n  margin: 10px;\n  position: relative;\n  top: 0;\n  left: 0;\n}\n.BIND_LAND_BTN li.active {\n  background: #e4e4e4;\n}\n.BIND_LAND_BTN li .icon-delete {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n  display: none;\n}\n.BIND_LAND_BTN li:hover .icon-delete {\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 618:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACPSURBVHja3JPdDYMwDIS/RFkirBIYgDnoMFmCbcIo/GxBH5pKFnKBUJ44ydLJztm+RDExxhbogQpY+cAIjpIzwAR0Nos95fBA74Q45M5fvoVW904cSAcT1brlT8gGdV7xTDRag6FgcNqzsIrn+sXvuwOn5MwJzkMthILBQW4w5/+QLjhYLPAClgviEejeAwCBmx7bk07M9gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 619:
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

__webpack_require__(620);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * type:edit 编辑页面没有按钮和信息 流程可选
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * type:submit 包含通过、驳回 流程不可选
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * type:read   只有已阅  流程不可选
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/*审批信息*/
//兼容ie

var ApprovalControlNode = function (_React$Component) {
    _inherits(ApprovalControlNode, _React$Component);

    function ApprovalControlNode(arg) {
        _classCallCheck(this, ApprovalControlNode);

        var _this = _possibleConstructorReturn(this, (ApprovalControlNode.__proto__ || Object.getPrototypeOf(ApprovalControlNode)).call(this, arg));

        _this.state = {
            aOpinions: "审核意见",
            aList: [{}],
            InfoData: [] //流程信息
        };
        _this.type = _this.props["type"] || "edit"; //以防外部没有设置type类型
        _this.getInfo = {
            entiId: "10004",
            dataKey: "1",
            userId: "1003",
            comanyId: "73939811F9A44B2DBF66FC7C83B745F9",
            comanyName: "东南"
        };
        _this.selectedFlows = []; //选人数据 
        _this.submitData = {
            DataKey: _this.props.guid, //表单guid
            EntiId: "10004", //流程id
            EventUserId: "", //当前登陆人
            Files: [], //附件
            ProcessComment: "提交" //
        };
        return _this;
    }

    _createClass(ApprovalControlNode, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (this.props.callback) {
                this.props.callback(this);
            }
            this.GetAjax();
        }
        /*监听审核意见*/

    }, {
        key: "changeAOinions",
        value: function changeAOinions(event) {
            this.setState({ aOpinions: event.target.value });
        }
    }, {
        key: "GetAjax",
        value: function GetAjax() {
            var th = this;
            iss.ajax({ //流程导航
                url: "/iWorkflow/Workflow/api/WFServices.asmx/GetSubmitWorkflows",
                type: "POST",
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(th.getInfo),
                success: function success(result) {

                    th.setState({
                        InfoData: JSON.parse(result.d.Data)
                    });
                },
                error: function error(e) {}
            });
        }
    }, {
        key: "EVENT_MOUSELEAVE_LI",
        value: function EVENT_MOUSELEAVE_LI(da) {
            //鼠标滑过
            console.log(da);
        }
    }, {
        key: "EVENT_CHANGE_LIST",
        value: function EVENT_CHANGE_LIST(da, ev) {
            //修改

            var id = ev.target.value;
            this.selectedFlows.forEach(function (el, ind) {
                if (el.ContextGuid == da.Id) {
                    // console.log(id);
                    el.Participants = [id];
                    return;
                }
            });
        }
    }, {
        key: "EVENT_CHANGE_CHECKBOX",
        value: function EVENT_CHANGE_CHECKBOX(da, ev) {
            //input
            var ta = ev.target;
            this.selectedFlows.forEach(function (el, ind) {
                if (el.ContextGuid == da.Id) {
                    //el.Participants=
                    var str = el.Participants.join(",");
                    if (!ta.checked) {

                        var regs = new RegExp(ta.value + ",*", "ig");
                        var ar = str.replace(regs, "").replace(/\,$/ig, ""); //.split(",");
                        el.Participants = ar.length <= 0 ? [] : ar.split(",");
                    } else {
                        if (str.indexOf(ta.value) < 0) {
                            el.Participants.push(ta.value);
                        }
                    }
                    // console.log(this.selectedFlows)
                    return;
                }
            });
            // console.log(this.selectedFlows)
        }
    }, {
        key: "EVENT_CLICK_SUBMIT",
        value: function EVENT_CLICK_SUBMIT() {
            //提交
            var th = this;
            th.BIND_CHECKED(); //检查数据
        }
    }, {
        key: "BIND_CHECKED",
        value: function BIND_CHECKED() {
            //第一次ajax提交检查数据
            var dto = {
                "runtimeUnique": {
                    EntiId: '10004', // 实体ID
                    DataKey: '111' // 业务ID
                }
            };
            var turnOut = true;
            var th = this;
            iss.ajax({
                url: "/iWorkflow/Workflow/api/WFServices.asmx/IsSubmitted",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(dto),
                success: function success(result) {
                    if (result.d["Data"] == "false" && result.d["Success"] == true) {
                        th.BIND_CHECKEDSUCESS(); //二次提交
                    }
                }
            });
        }
    }, {
        key: "BIND_CHECKEDSUCESS",
        value: function BIND_CHECKEDSUCESS() {
            //第二次ajax提交提交流程
            var th = this;
            th.submitData.EventUserId = iss.userInfo.ID; //设置登陆人id
            var submitdata = JSON.stringify({
                submitData: th.submitData,
                selectedFlows: this.selectedFlows
            });
            console.log(submitdata);
            iss.ajax({
                url: "/iWorkflow/Workflow/api/WFServices.asmx/SubmitWorkflow",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: submitdata,
                success: function success(result) {
                    var rt = result.d;
                    // turnOut = rt.Success;
                    if (rt.Success == true) {} else {
                        console.log(rt.Message);
                    }
                }
            });
        }
    }, {
        key: "setInfoDataList",
        value: function setInfoDataList() {
            var th = this;
            if (!this.state.InfoData.length) {
                return;
            }
            var list = this.state.InfoData[0]["Flows"];
            th.selectedFlows = [];
            return list.map(function (el, ind) {
                var submit = { //提交数据
                    ContextGuid: el.Id, //自己id
                    FlowName: el.Text, //Text 节点名称
                    FlowType: el.Type, //流程类型
                    FlowType2: el.FlowType2, //加嵌
                    ParentContextGuid: el.PId, //父id
                    Participants: [], //用户
                    RunFlowId: "0" //流程节点
                },
                    userArra = [];
                th.selectedFlows.push(submit); //按地址引用先push后修改

                if (el.Type == "Approve" && th.type == "edit" && el.Users.length >= 2) {

                    return _react2.default.createElement(
                        "li",
                        { key: ind },
                        _react2.default.createElement(
                            "span",
                            null,
                            el.Text
                        ),
                        _react2.default.createElement(
                            "select",
                            { onChange: th.EVENT_CHANGE_LIST.bind(th, el) },
                            el.Users.map(function (ee, ii) {
                                if (ii == 0) {
                                    userArra.push(ee.UId);
                                    submit.Participants = userArra;
                                }
                                return _react2.default.createElement(
                                    "option",
                                    { key: ii, value: ee.UId },
                                    ee.Name
                                );
                            })
                        )
                    );
                } else if (el.Type == "AutoInform" && th.type == "edit") {
                    return _react2.default.createElement(
                        "li",
                        { key: ind },
                        _react2.default.createElement(
                            "span",
                            null,
                            el.Text,
                            "\u3010",
                            el.Users.map(function (h, l) {
                                userArra.push(h.UId);
                                submit.Participants = userArra;
                                return _react2.default.createElement(
                                    "label",
                                    { key: l },
                                    _react2.default.createElement("input", { key: l, type: "checkbox", defaultChecked: "true", value: h.UId, onChange: th.EVENT_CHANGE_CHECKBOX.bind(th, el) }),
                                    h.Name + (l == el.Users.length - 1 ? "" : ",")
                                );
                            }),
                            "\u3011"
                        )
                    );
                } else {
                    var str = el.Users.map(function (vv, jj) {
                        for (var i = 0; i < userArra.length; i++) {
                            //  if(userArra[i]["Id"])
                        }
                        userArra.push(vv.UId);
                        return vv.Name + (jj == el.Users.length - 1 ? "" : ",");
                    });
                    submit.Participants = userArra;
                    // th.selectedFlows.push(submit);
                    return _react2.default.createElement(
                        "li",
                        { key: ind },
                        _react2.default.createElement(
                            "span",
                            null,
                            el.Text
                        ),
                        _react2.default.createElement(
                            "span",
                            null,
                            "\u3010",
                            str,
                            "\u3011"
                        )
                    );
                }
            }, this);
        }
    }, {
        key: "render",
        value: function render() {

            var re_aOpinions = this.state.aOpinions;
            return _react2.default.createElement(
                "div",
                { className: "boxGroupDetail" },
                _react2.default.createElement(
                    "h3",
                    { className: "boxGroupTitBig" },
                    _react2.default.createElement(
                        "p",
                        null,
                        _react2.default.createElement(
                            "span",
                            null,
                            "\u5BA1\u6279\u4FE1\u606F"
                        )
                    )
                ),
                _react2.default.createElement(
                    "table",
                    { className: "table tableProject" },
                    _react2.default.createElement(
                        "tbody",
                        null,
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "td",
                                { width: "100" },
                                "\u5BA1\u6279\u6D41\u7A0B"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "  ",
                                _react2.default.createElement(
                                    "ul",
                                    { className: "ApplyFlow" },
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        "\u53D1\u8D77\u4EBA\u3010\u6B27\u9633\u5C11\u534E\u3011"
                                    ),
                                    this.setInfoDataList()
                                )
                            )
                        ),
                        this.type != "edit" && _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement("td", null),
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement("textarea", { className: "textareaText", value: re_aOpinions, onChange: this.changeAOinions.bind(this) })
                            )
                        )
                    )
                ),
                this.type != "edit" && _react2.default.createElement(
                    "p",
                    { className: "btnBox" },
                    _react2.default.createElement(
                        "a",
                        { className: "btn", href: "javascript:;", onClick: this.EVENT_CLICK_SUBMIT.bind(this) },
                        "\u901A\u8FC7"
                    ),
                    _react2.default.createElement(
                        "a",
                        { className: "btn", href: "javascript:;" },
                        "\u9A73\u56DE"
                    )
                ),
                _react2.default.createElement(
                    "table",
                    { className: "table tableProject approvalProcess" },
                    _react2.default.createElement(
                        "tbody",
                        null,
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "th",
                                null,
                                "\u8282\u70B9"
                            ),
                            _react2.default.createElement(
                                "th",
                                null,
                                "\u610F\u89C1"
                            ),
                            _react2.default.createElement(
                                "th",
                                null,
                                "\u64CD\u4F5C\u4EBA"
                            ),
                            _react2.default.createElement(
                                "th",
                                null,
                                "\u64CD\u4F5C\u65F6\u95F4"
                            ),
                            _react2.default.createElement(
                                "th",
                                null,
                                "\u64CD\u4F5C"
                            )
                        ),
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u7247\u533A\u6210\u672C\u7ECF\u7406"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u540C\u610F\uFF0C\u8BF7\u9886\u5BFC\u5BA1\u6279\uFF01"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u5F20\u5FD7\u6210"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "2014-06-08 17:00"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u6279\u51C6"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ApprovalControlNode;
}(_react2.default.Component);

exports.default = ApprovalControlNode;

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(621);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(608)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./newProjectApproval.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./newProjectApproval.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(607)(undefined);
// imports


// module
exports.push([module.i, "h1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: lighter;\n}\ntextarea,\ntextarea:hover {\n  outline: none;\n}\n.boxGroupDetail {\n  padding: 0 0px;\n  font-size: 1rem;\n}\n.boxGroupDetail .textareaText {\n  width: 100%;\n  height: 80px;\n  padding: 10px;\n  resize: none;\n  border: 1px solid #dddddd;\n}\n.boxGroupDetail .boxGroupTitBig {\n  height: 40px;\n  line-height: 40px;\n  background: #0b4082;\n  color: #ffffff ;\n  padding: 0 20px 0 40px;\n  background-image: url(" + __webpack_require__(622) + ");\n  background-repeat: no-repeat;\n  background-position: 15px;\n}\n.boxGroupDetail .formTable2 tr td {\n  width: 202px;\n}\n.boxGroupDetail .formTable2 tr td:nth-of-type(1) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable2 tr td:nth-of-type(3) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable2 tr td:nth-of-type(5) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable1 tr td {\n  width: 202px;\n}\n.boxGroupDetail .formTable1 tr td:nth-of-type(1) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable1 tr td:nth-of-type(3) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable1 tr td:nth-of-type(5) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable3 tr:nth-of-type(1) th {\n  background: #f5f5f5;\n  text-align: center;\n}\n.boxGroupDetail .formTable3 tr td:nth-of-type(1) {\n  background: #f5f5f5;\n  text-align: right;\n}\n.boxGroupDetail .formTable3 tr td .inputTextBox {\n  width: 100%;\n}\n.boxGroupDetail .formTableLabel {\n  width: 100%;\n  text-align: right;\n}\n.boxGroupDetail table > tbody > tr > td,\n.boxGroupDetail .table > tbody > tr > th,\n.boxGroupDetail .table > tfoot > tr > td,\n.boxGroupDetail .table > tfoot > tr > th,\n.boxGroupDetail .table > thead > tr > td,\n.boxGroupDetail .table > thead > tr > th {\n  padding: 2px !important;\n  border: 1px solid #dddddd;\n}\n.boxGroupDetail .tableProject {\n  margin-top: 20px;\n}\n.boxGroupDetail .btnBox {\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n}\n.boxGroupDetail .btnBox a {\n  display: inline-block;\n  padding: 0 12px;\n  height: 26px;\n  line-height: 26px;\n  background: #0b4082;\n  color: #ffffff ;\n  margin: 0 10px;\n}\n.boxGroupDetail .btnBox a:hover {\n  background: #f1a118;\n}\n.boxGroupDetail .approvalProcess tr th {\n  text-align: center;\n  background: #f5f5f5;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(1) {\n  width: 150px;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(3) {\n  width: 150px;\n  text-align: center;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(4) {\n  width: 150px;\n  text-align: center;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(5) {\n  width: 150px;\n  text-align: center;\n}\n.ApplyFlow li {\n  display: inline-block;\n  margin: 0 3px;\n  cursor: pointer;\n}\n.ApplyFlow li::after {\n  display: inline-block;\n  content: \"->\";\n  margin-left: 3px;\n}\n.ApplyFlow li:last-child::after {\n  display: none;\n}\n.ApplyFlow li label {\n  font-weight: normal;\n}\n", ""]);

// exports


/***/ }),

/***/ 622:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuUlEQVQ4T+2TXQ3CQBCE53MADnAADkBCJVQCEooDJFQCEiqhOKiEOhiyTSFtc3AlvLLJPd3Otz83h34MpnrbzRe8HiheANtnSUdJ1wzkDvRRDDgNANutpDhdRryRVEg6SLpNAQPNdhW8JQS42C6BesyJUasU4JTqAGhsH4D2HaAfR1izw52kMtnBGvXHEf4Akk+43Mu4xL2k7cyJQLgrG7bD6h0wWP5p5VpSUMMPuYjKr2Kz35hTpu4fyuOCEY3r4pUAAAAASUVORK5CYII="

/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.extend($.fn.validatebox.defaults, {
	missingMessage: "必填项"
});
$.extend($.fn.validatebox.defaults.rules, {

	max: {
		validator: function validator(value, param) {
			var maxVal = param[0];
			return value <= maxVal;
		},
		message: '输入的值不能大于{0}'
	},
	number: {
		validator: function validator(value, param) {
			return (/^(0|[1-9][0-9]*)(.[0-9]{1,6})?$/.test(value)
			);
		},
		message: '只能输入数字且小数不能多于6位'
	}

});

/***/ }),

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(625);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(608)(content, options);
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

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(607)(undefined);
// imports


// module
exports.push([module.i, ".clear {\n  clear: both;\n}\n.boxGroupTit {\n  height: 40px;\n  margin-bottom: 5px ;\n  position: relative;\n  margin-top: 0;\n}\n.boxGroupTit p {\n  height: 40px;\n  line-height: 40px;\n  color: #333333;\n  font-size: 14px;\n  border-bottom: 1px solid #c9c9c9;\n}\n.boxGroupTit p span {\n  display: inline-block;\n  line-height: 40px;\n  border-bottom: 2px solid #31395d;\n}\n.boxGroupTit p i {\n  font-style: normal;\n}\n.boxGroupTit span.functionButton {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: auto;\n  text-align: right;\n}\n.boxGroupTit span.functionButton a {\n  font-size: 12px;\n  height: 40px;\n  line-height: 40px;\n  display: inline-block;\n  padding-left: 20px;\n  padding-right: 20px;\n  color: #999999 !important;\n  background-repeat: no-repeat;\n  background-position: left center;\n}\n.boxGroupTit span.functionButton a:hover {\n  color: #31395d;\n}\n.boxGroupTit span.functionButton .refresh-icon {\n  background-image: url(" + __webpack_require__(626) + ");\n}\n.boxGroupTit span.functionButton .refresh-icon:hover {\n  background-image: url(" + __webpack_require__(627) + ");\n}\n.boxGroupTit span.functionButton .saveIcon {\n  background-image: url(" + __webpack_require__(628) + ");\n}\n.boxGroupTit span.functionButton .saveIcon:hover {\n  background-image: url(" + __webpack_require__(629) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon {\n  background-image: url(" + __webpack_require__(630) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon:hover {\n  background-image: url(" + __webpack_require__(631) + ");\n}\n.staging-left,\n.staging-right {\n  float: left;\n}\n.projectinFormation {\n  width: 66.6%;\n  height: auto;\n  margin-top: 10px;\n  padding-right: 20px;\n}\n.fieldLocation {\n  margin-top: 10px;\n  width: 33.3%;\n  height: 295px;\n  border: 1px solid #dddddd;\n}\n.carouselStyle .left,\n.carouselStyle .right {\n  background: none;\n}\n.carouselStyle .carousel-control {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  top: 50%;\n  margin-top: -15px;\n  background: #F1A118;\n}\n.carouselStyle .carousel-control:hover {\n  opacity: 0.8;\n}\n", ""]);

// exports


/***/ }),

/***/ 626:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABO0lEQVQ4T6VSsXHDMAwkWLBOJohG8AbRBrE3sBrxWNnZQNlAHUk1zgbWBlEmiD1Bkg3USgWQg45y7Fgn5s4sCeDx/3gQNz6Ymt/tdnd932+IaA0ASehpiagmohdjzNc4dwVQVdWCiN6I6J2ISmNMw838j4gMuEHEzBjzyv8XANbaREr5gYjPY8NfhmEBg6611vUFgPeeC43WupizxlqbSilrpVRyAgjbP5VS91mWtTFvnXMHlngOwKiF1jqNDXPdez+whKDpiYh4MAEANufI+uaAAkA6MAjaH8PAt1JqEZPhnCsBoB0A+O5d1zV8cwBI8zw/xGSwBwBQnDwIUpIY9cB4K4TYaq1/rxDbONa990smjYgrDtlklKfCg4gPQoglAKzGEF0lcYpF2LgnoiMAcHjKc4P/xWBO3s0AP2hInl/EMUEDAAAAAElFTkSuQmCC"

/***/ }),

/***/ 627:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4T6WTgQ0BQRBFnw6ogBJ0QAfogArQAR3ogA7oABWgAnRwJcjb7CbncmcvMcnmkt2ZN//P7nX4MzoN9V1gCcyBQcwpgBOwBV6prg4wBM7AFdgBl5jsvkDBC+DgfhVgtxuwTgk1CgUJFXaqAjxwbTKjGUc7gzLA7k+gB+g3F3ctlgFS7ey3TQSVAvQ0iYWqcDiPKPEXKDRLCvQ9itnvCM3Z8IaKBPDehahAC/rLhTmb8gy0IsDHkosV4Pq6hVxROp8Ce2Cm6qanXIWprg9YbGF4RHUvsU6FRcfSzYTh/foX2loJeW0tNEI/qngqkZ/g9CsAAAAASUVORK5CYII="

/***/ }),

/***/ 628:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHxJREFUeNpinDlzJgM5gAlKewLxMyD+TwA/g6qFa5wLxGFAzAjlM6JhmFgYVC1coyQQH8Hiov9o/CNQtXCNZPsRGTwHYhsk51kD8Qt0RSxYNKYA8WogloDynwJxMjEat8H8QapTyfbjINeIHAX4ADxqWHBEAS4AjxqAAAMASR4bIq9a4swAAAAASUVORK5CYII="

/***/ }),

/***/ 629:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJFJREFUeNpi/P//PwM5gAVEePnleAKpuUAsSUD9cyBO3rZpynYGkI2evtnPgNgGyv4PopExTAykBqQWxGaCmiQJNOUIuvFAl6D4A6oG7ComBjIBNo3PgTbZQG1gBLKtgcwXWAMHDaQA8WqgBgko/ykoQAhqBNqyjYjQpa4fB7lGeBTgA8hRw4IjCnABeNQABBgANs1HTp7NXyoAAAAASUVORK5CYII="

/***/ }),

/***/ 630:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4T6WTzXHCQAyFn/bAcAsdxCW4BHcQSogvaH0jHZAOuBlxASoIqSDuAHcQ0gE5cmCVkcdmjDFkMtnbrqRPTz9L+OehvngRmarqExHFqlqq6muWZUWf7xVARGYAosFgME3T9LBcLuMQwpqIZsy87UIuAKvVanQ8Hgvvfdx2zPM8cs4VzBzdBeR5nhDR2Hs/7TqKiDLzleKLB8tERNsbCkpmHt1VYMbFYrElok9mfrF7Lf8NwIaZ578CrGmq+gFgpKp7IopU9d17P24Bd6q6sVIvSqgn8AxgHkIom2zD4bBsJnI6nWLnXAIgsaaeASKytoBmfF2pbWUhhBRAkWXZvgJY951zNmcjX512MIBvIkomk0mlsALUjVv3Lcq94DNARPZ9S2IOZgPw2M3cyKwU3FqSOvsOwJctWCO7XWMDOAB4aBts62wH7M2adevT9v7Gv/zwH4PhtBGvNQeUAAAAAElFTkSuQmCC"

/***/ }),

/***/ 631:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4T6WTzU3DQBCF3+BF4oY7wCVsDpHsmzsgxyhypNBB6MB0kBIc2ULcCBXg21ri4O2A0EG4RSJk0Do/bJwlCOGbtTPfvJl5Q/jnR658GQ3HYL4GkQSzBnCnq6J0xR4BZJikAAIsxVjrbCG7A0neWcaEVKti1oYcAKQc+XSxKuuqkHagDPsBkShrVQSnAWESg9DTqhi3AzvRkGuVHyk+VGAqQcycCiB0XRX+SQXmUUZD0+erVvlt8x/2A5B4BGiqVT75HdAdSAjvmQCfGXMiBAw8aZX3voHnNcBT02qrhSQlwohBk+36NgWXQu82As+TAMdEiM1Q9wAZJtk2uFlfW6pZp6XsBvgodfUwbwDSTB+U6iqPncayksH8zp/rWL/cG4NhA2gGx5nLKHbldvIe0ImSucskJsC8AXTlSrYAbpM0Nhaemfgbr9a9nWy7zaaFTpgsQHRpPxjXNR4AYIb109E6r/EvF/4FXk6sEdl++K0AAAAASUVORK5CYII="

/***/ }),

/***/ 632:
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
__webpack_require__(647);
// 城市选择框显示 

var db = ['北京|beijing|bj', '上海|shanghai|sh', '重庆|chongqing|cq', '深圳|shenzhen|sz', '广州|guangzhou|gz', '杭州|hangzhou|hz', '南京|nanjing|nj', '苏州|shuzhou|sz', '天津|tianjin|tj', '成都|chengdu|cd', '南昌|nanchang|nc', '三亚|sanya|sy', '青岛|qingdao|qd', '厦门|xiamen|xm', '西安|xian|xa', '长沙|changsha|cs', '合肥|hefei|hf', '西藏|xizang|xz', '内蒙古|neimenggu|nmg', '安庆|anqing|aq', '阿泰勒|ataile|atl', '安康|ankang|ak', '阿克苏|akesu|aks', '包头|baotou|bt', '北海|beihai|bh', '百色|baise|bs', '保山|baoshan|bs', '长治|changzhi|cz', '长春|changchun|cc', '常州|changzhou|cz', '昌都|changdu|cd', '朝阳|chaoyang|cy', '常德|changde|cd', '长白山|changbaishan|cbs', '赤峰|chifeng|cf', '大同|datong|dt', '大连|dalian|dl', '达县|daxian|dx', '东营|dongying|dy', '大庆|daqing|dq', '丹东|dandong|dd', '大理|dali|dl', '敦煌|dunhuang|dh', '鄂尔多斯|eerduosi|eeds', '恩施|enshi|es', '福州|fuzhou|fz', '阜阳|fuyang|fy', '贵阳|guiyang|gy', '桂林|guilin|gl', '广元|guangyuan|gy', '格尔木|geermu|gem', '呼和浩特|huhehaote|hhht', '哈密|hami|hm', '黑河|heihe|hh', '海拉尔|hailaer|hle', '哈尔滨|haerbin|heb', '海口|haikou|hk', '黄山|huangshan|hs', '邯郸|handan|hd', '汉中|hanzhong|hz', '和田|hetian|ht', '晋江|jinjiang|jj', '锦州|jinzhou|jz', '景德镇|jingdezhen|jdz', '嘉峪关|jiayuguan|jyg', '井冈山|jinggangshan|jgs', '济宁|jining|jn', '九江|jiujiang|jj', '佳木斯|jiamusi|jms', '济南|jinan|jn', '喀什|kashi|ks', '昆明|kunming|km', '康定|kangding|kd', '克拉玛依|kelamayi|klmy', '库尔勒|kuerle|kel', '库车|kuche|kc', '兰州|lanzhou|lz', '洛阳|luoyang|ly', '丽江|lijiang|lj', '林芝|linzhi|lz', '柳州|liuzhou|lz', '泸州|luzhou|lz', '连云港|lianyungang|lyg', '黎平|liping|lp', '连成|liancheng|lc', '拉萨|lasa|ls', '临沧|lincang|lc', '临沂|linyi|ly', '芒市|mangshi|ms', '牡丹江|mudanjiang|mdj', '满洲里|manzhouli|mzl', '绵阳|mianyang|my', '梅县|meixian|mx', '漠河|mohe|mh', '南充|nanchong|nc', '南宁|nanning|nn', '南阳|nanyang|ny', '南通|nantong|nt', '那拉提|nalati|nlt', '宁波|ningbo|nb', '攀枝花|panzhihua|pzh', '衢州|quzhou|qz', '秦皇岛|qinhuangdao|qhd', '庆阳|qingyang|qy', '齐齐哈尔|qiqihaer|qqhe', '石家庄|shijiazhuang|sjz', '沈阳|shenyang|sy', '思茅|simao|sm', '铜仁|tongren|tr', '塔城|tacheng|tc', '腾冲|tengchong|tc', '台州|taizhou|tz', '通辽|tongliao|tl', '太原|taiyuan|ty', '威海|weihai|wh', '梧州|wuzhou|wz', '文山|wenshan|ws', '无锡|wuxi|wx', '潍坊|weifang|wf', '武夷山|wuyishan|wys', '乌兰浩特|wulanhaote|wlht', '温州|wenzhou|wz', '乌鲁木齐|wulumuqi|wlmq', '万州|wanzhou|wz', '乌海|wuhai|wh', '兴义|xingyi|xy', '西昌|xichang|xc', '襄樊|xiangfan|xf', '西宁|xining|xn', '锡林浩特|xilinhaote|xlht', '西双版纳|xishuangbanna|xsbn', '徐州|xuzhou|xz', '义乌|yiwu|yw', '永州|yongzhou|yz', '榆林|yulin|yl', '延安|yanan|ya', '运城|yuncheng|yc', '烟台|yantai|yt', '银川|yinchuan|yc', '宜昌|yichang|yc', '宜宾|yibin|yb', '盐城|yancheng|yc', '延吉|yanji|yj', '玉树|yushu|ys', '伊宁|yining|yn', '珠海|zhuhai|zh', '昭通|zhaotong|zt', '张家界|zhangjiajie|zjj', '舟山|zhoushan|zs', '郑州|zhengzhou|zz', '中卫|zhongwei|zw', '芷江|zhijiang|zj', '湛江|zhanjiang|zj'];

var ToolsCity = function (_React$Component) {
    _inherits(ToolsCity, _React$Component);

    function ToolsCity(str) {
        _classCallCheck(this, ToolsCity);

        var _this = _possibleConstructorReturn(this, (ToolsCity.__proto__ || Object.getPrototypeOf(ToolsCity)).call(this, str));

        _this.state = {
            current: "ABCDEFG"
        };
        _this.db = {}; //数据
        _this.createCity(); //城市初始化
        _this.open = _this.BIND_OPEN; //
        return _this;
    }

    _createClass(ToolsCity, [{
        key: "createCity",
        value: function createCity() {
            //初始化分组
            /* 正则表达式 筛选中文城市名、拼音、首字母 */

            var regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
            var regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;
            var citys = db,
                match,
                letter,
                reg2 = /^[a-g]$/i,
                reg3 = /^[h-l]$/i,
                reg4 = /^[m-t]$/i,
                reg5 = /^[w-z]$/i,
                arr = {};

            arr = { hot: {}, ABCDEFG: {}, HIJKL: {}, MNOPQRST: {}, WXYZ: {} };
            //console.log(citys.length);
            for (var i = 0, n = citys.length; i < n; i++) {
                match = regEx.exec(citys[i]); //exec
                letter = match[3].toUpperCase(); //转换字母为大写

                if (reg2.test(letter)) {
                    //test检测一个字符串是否匹配某个模式
                    if (!arr.ABCDEFG[letter]) arr.ABCDEFG[letter] = [];
                    arr.ABCDEFG[letter].push(match[1]);
                } else if (reg3.test(letter)) {
                    if (!arr.HIJKL[letter]) arr.HIJKL[letter] = [];
                    arr.HIJKL[letter].push(match[1]);
                } else if (reg4.test(letter)) {
                    if (!arr.MNOPQRST[letter]) arr.MNOPQRST[letter] = [];
                    arr.MNOPQRST[letter].push(match[1]);
                } else if (reg5.test(letter)) {
                    if (!arr.WXYZ[letter]) arr.WXYZ[letter] = [];
                    arr.WXYZ[letter].push(match[1]);
                }
                /* 热门城市 前16条 */
                if (i < 16) {
                    if (!arr.hot['hot']) arr.hot['hot'] = [];
                    arr.hot['hot'].push(match[1]);
                }
            }

            this.db = arr;
            this.target = "";
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {

            this.EVENT_JQUERY_WINDOW();
        }
    }, {
        key: "BIND_OPEN",
        value: function BIND_OPEN(ev) {
            //外界通讯
            this.target = ev;
            this.refs.ToolsCity.className = this.refs.ToolsCity.className.replace("hide", "");
        }
    }, {
        key: "EVENT_JQUERY_WINDOW",
        value: function EVENT_JQUERY_WINDOW() {
            //全局监控
            $(".tc-body").scrollUnique();
        }
    }, {
        key: "EVENT_CLICK_OLLI",
        value: function EVENT_CLICK_OLLI(da, ev) {
            //点击
            var th = this,
                ToolsCity = th.refs.ToolsCity;
            ToolsCity.className += " hide";
            var data = da;
            /*   db.forEach((el,ind)=>{
                  if(el.indexOf(da)>=0){
                      data=el;
                      return 
                  }
              }) */
            if (th.props.callback) {
                th.props.callback(data, th.target);
            }
        }
    }, {
        key: "EVENT_HEADER_CLICK",
        value: function EVENT_HEADER_CLICK(da, ev) {
            //头部切换
            var th = this,
                self = $(ev.target),
                pa = self.parent();
            pa.find("li").removeClass("active");
            self.addClass("active");
            this.setState({
                current: da
            });
        }
    }, {
        key: "setCity",
        value: function setCity() {
            var _this2 = this;

            var sd = this.db[this.state.current];
            var list = Object.keys(sd).sort();
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                arr.push(_react2.default.createElement(
                    "li",
                    { key: i },
                    _react2.default.createElement(
                        "span",
                        null,
                        list[i]
                    ),
                    _react2.default.createElement(
                        "ol",
                        null,
                        sd[[list[i]]].map(function (el, ind) {
                            return _react2.default.createElement(
                                "li",
                                { onClick: _this2.EVENT_CLICK_OLLI.bind(_this2, el), key: ind },
                                el
                            );
                        })
                    )
                ));
            }
            return arr;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "ToolsCity hide", ref: "ToolsCity" },
                _react2.default.createElement(
                    "ul",
                    { className: "tc-header" },
                    _react2.default.createElement(
                        "li",
                        { className: "active", onClick: this.EVENT_HEADER_CLICK.bind(this, "ABCDEFG") },
                        "ABCDEFG"
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "", onClick: this.EVENT_HEADER_CLICK.bind(this, "HIJKL") },
                        "HIJKL"
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "", onClick: this.EVENT_HEADER_CLICK.bind(this, "MNOPQRST") },
                        "MNOPQRST"
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "", onClick: this.EVENT_HEADER_CLICK.bind(this, "WXYZ") },
                        "WXYZ"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "tc-body", ref: "tcBody" },
                    _react2.default.createElement(
                        "ul",
                        null,
                        this.setCity()
                    )
                )
            );
        }
    }]);

    return ToolsCity;
}(_react2.default.Component);

exports.default = ToolsCity;

/***/ }),

/***/ 646:
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

var _toolsCity = __webpack_require__(632);

var _toolsCity2 = _interopRequireDefault(_toolsCity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//兼容ie
__webpack_require__(623);
__webpack_require__(632);
__webpack_require__(624);

//城市
var NewProjectCount = function (_React$Component) {
    _inherits(NewProjectCount, _React$Component);

    function NewProjectCount(arg) {
        _classCallCheck(this, NewProjectCount);

        var _this = _possibleConstructorReturn(this, (NewProjectCount.__proto__ || Object.getPrototypeOf(NewProjectCount)).call(this, arg));

        _this.state = {
            "CompanyAreaName": "",
            "CompanyCityName": "", //选城市
            "PROJECTNAME": "", //项目名称
            "CASENAME": "",
            "PROJECTADDRESS": "",
            "TRADERMODE": "",
            "PROJECTTYPE": "",
            "EQUITYRATIO": "",
            "PROJECTCODE": "", //案号
            "PRINCIPALNAME": "",
            "PRINCIPAL": "",
            "ID": "",
            "CITY": "",
            "mapUrl": "http://192.168.11.164:82",
            "checkName": false //项目名称冲突
            // "cityCompany":iss.id.text,
        };
        iss.hashHistory.listen(function (local, next) {
            //console.log(arguments)
        });
        _this.time = "";
        _this.props.point(_this); //父页面重定
        return _this;
    }

    _createClass(NewProjectCount, [{
        key: "getAjax",
        value: function getAjax() {
            if (iss.id == "") {
                return;
            };
            var th = this;
            // console.log(th);
            //   let projectId = this.props.location.state.id;
            var status = this.props.local.query.status;
            var json = {};
            var urlProject;
            //console.log(status)
            if (status == "edit") {
                urlProject = "/Project/IProjectInfo";
                json.projectId = iss.id.id;
            } else if (status == "add") {
                urlProject = "/Project/INewProject";
                json.cityId = iss.id.id;
            }
            iss.ajax({ //获取数据
                type: "post",
                //url:"/Project/IProjectInfo",  
                url: urlProject,
                data: json,
                success: function success(res) {
                    //console.log(res.rows);
                    // console.log(res.rows.SelectOptions.TRADERMODE)
                    th.setState({
                        "PROJECTNAME": res.rows.BaseFormInfo.Project.PROJECTNAME,
                        "CASENAME": res.rows.BaseFormInfo.Project.CASENAME,
                        "EQUITYRATIO": res.rows.BaseFormInfo.Project.EQUITYRATIO,
                        "PROJECTCODE": res.rows.BaseFormInfo.Project.PROJECTCODE,
                        "PRINCIPALNAME": res.rows.BaseFormInfo.PRINCIPALNAME,
                        "PRINCIPAL": res.rows.BaseFormInfo.Project.PRINCIPAL,
                        "PROJECTADDRESS": res.rows.BaseFormInfo.Project.PROJECTADDRESS,
                        //"PROJECTTYPE":res.rows.BaseFormInfo.Project.PROJECTTYPE,
                        "TRADERMODE": res.rows.BaseFormInfo.Project.TRADERMODE,
                        "ObtainStatusName": res.rows.BaseFormInfo.ObtainStatusName,
                        "CompanyAreaName": res.rows.BaseFormInfo.CompanyAreaName,
                        "CompanyCityName": res.rows.BaseFormInfo.CompanyCityName,
                        "ID": res.rows.BaseFormInfo.Project.ID,
                        "PARENTID": res.rows.BaseFormInfo.Project.PARENTID,
                        "CITY": res.rows.BaseFormInfo.Project.CITY
                    }, function (arg) {
                        //console.log(th.state)
                        th.bind_combobox(res);
                        th.BIND_CHANGE_DATA(th.state);
                    });
                },
                error: function error(e) {}
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var id = iss.id;

            if (id == "1E1CB1E95A864AFA961392C3E3644642" || !id) {
                iss.hashHistory.replace({ pathname: "index" });
            } else {
                this.getAjax();
            }
            //this.BIND_ProjectValid();//绑定验证
        }
    }, {
        key: "handChooseTo",
        value: function handChooseTo(ev, da) {
            var th = this;
            var peopleJson = {};
            var PrincipalId = {
                "id": th.state.PRINCIPAL,
                "text": th.state.PRINCIPALNAME
            };
            if (th.state.PRINCIPAL) {
                peopleJson['PrincipalId'] = PrincipalId;
            }
            iss.chooseTo({
                url: "/Common/IGetOrganizationalUsers",
                title: "选择人员",
                pepole: peopleJson, //已选人员名单
                callback: function callback(da) {
                    if (Object.keys(da).length == 0 || !da) {
                        th.setState({
                            "PRINCIPAL": "",
                            "PRINCIPALNAME": ""
                        });
                    } else {
                        for (var key in da) {
                            console.log(da[key]);
                            th.setState({
                                "PRINCIPAL": da[key].id,
                                "PRINCIPALNAME": da[key].text
                            });
                            th.BIND_CHANGE_DATA(th.state);
                        }
                    }
                }
            });
        }
    }, {
        key: "handleInputTextBlur",
        value: function handleInputTextBlur(e) {
            var th = this;
            clearTimeout(th.time);
            var target = e.target.id;

            th.setState(_defineProperty({}, target, e.target.value), function () {
                th.BIND_CHANGE_DATA(th.state);
            });
            th.time = setTimeout(function (arg) {
                iss.ajax({
                    type: "post",
                    url: "/Project/IProjectCode",
                    data: {
                        cityId: th.state.PARENTID,
                        caseName: th.state.CASENAME
                    },
                    success: function success(res) {
                        console.log(res);
                        th.setState({
                            "PROJECTCODE": res.rows
                        }, function (arg) {
                            //console.log(th.state)
                            th.BIND_CHANGE_DATA(th.state);
                        });
                    },
                    error: function error(e) {}
                });
            }, 1000);

            // console.log(e.target.id);
            //console.log(e.target.value);
        }
    }, {
        key: "handleInputTextChange",
        value: function handleInputTextChange(e) {
            var _this2 = this;

            var th = this;
            var target = e.target.id;

            this.setState(_defineProperty({}, target, e.target.value), function () {
                th.BIND_CHANGE_DATA(_this2.state);
            });
        }
    }, {
        key: "BIND_CITY_CALLBACK",
        value: function BIND_CITY_CALLBACK(da, ev) {
            //城市回掉
            if (ev) {
                var id = ev.id;
                this.setState(_defineProperty({}, id, da));
            } else {
                console.log("打开时传入：this.refs.ToolsCity.open(ev.target)");
            }
        }
    }, {
        key: "EVENT_CLICK_CITYINPUT",
        value: function EVENT_CLICK_CITYINPUT(str, ev) {
            //城市点击
            //console.log(ToolsCity);
            this.refs.ToolsCity.open(ev.target);
        }
    }, {
        key: "handleSelectTextChange",
        value: function handleSelectTextChange(e, b, c) {
            var _this3 = this;

            var th = this;
            this.setState(_defineProperty({}, e, b), function () {
                th.BIND_CHANGE_DATA(_this3.state);
            });
            //console.log(this.state);  
        }
    }, {
        key: "bind_combobox",
        value: function bind_combobox(arg) {
            var th = this;

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
            tradersWay.combobox("select", arg.rows.BaseFormInfo.Project.TRADERMODE);
        }
    }, {
        key: "BIND_CHECKPROJECTNAME",
        value: function BIND_CHECKPROJECTNAME(ev) {
            //检查姓名名称是否冲突

            var th = this;
            var projectid = iss.id.id;
            var name = ev.target.value;
            this.setState({
                projectid: iss.id,
                PROJECTNAME: name
            }, function (arg) {
                th.BIND_CHANGE_DATA(th.state);
            });

            clearTimeout(this.time);
            this.time = setTimeout(function (arg) {

                iss.ajax({
                    type: "POST",
                    url: "/Project/IProjectNameExists",
                    data: {
                        projectid: iss.id,
                        name: th.state.PROJECTNAME
                    },
                    success: function success(data) {
                        if (data["rows"] == false) {
                            //th.BIND_CHANGE_DATA(th.state);
                            th.setState({ checkName: true }, function (arg) {
                                th.BIND_CHANGE_DATA(th.state);
                            });
                        } else {
                            th.setState({ checkName: false }, function (arg) {
                                th.BIND_CHANGE_DATA(th.state);
                            });
                        }
                    },
                    error: function error(er) {
                        console.log('错误');
                        th.setState({ checkName: false }, function (arg) {
                            th.BIND_CHANGE_DATA(th.state);
                        });
                    }
                });
            }, 1000);
        }
    }, {
        key: "BIND_CHANGE_DATA",
        value: function BIND_CHANGE_DATA(data) {
            this.props.NewProjectCountDATA(data);
        }
    }, {
        key: "xmViewError",
        value: function xmViewError(event) {
            //this.attr("src","../img/xmViewError.png")
            $(event.target).attr("src", "../../Content/img/xmViewError.png");
        } //加载暂无

    }, {
        key: "BIND_EditMapMark",
        value: function BIND_EditMapMark(event) {
            var _this4 = this;

            var status = this.props.local.query.status;
            if (window.confirm('确认保存项目信息数据并进行落位?')) {
                this.props.save(function (arg) {
                    if ($.trim(_this4.state.PROJECTNAME)) {
                        if (status == "add") {

                            window.open(_this4.state.mapUrl + "/Admin/EditMapMark?project_id=" + _this4.state.ID + "&cityname=" + _this4.state.CompanyCityName + "&callback=callback");
                        } else {
                            window.open(_this4.state.mapUrl + "/Admin/EditMapMark?project_id=" + _this4.state.ID + "&cityname=" + _this4.state.CompanyCityName + "&callback=callback");
                        }
                    } else {
                        //  alert("请输入项目名称");
                        iss.popover({ content: "请输入项目名称" });
                    }
                });
                return true;
            }
        } //点击标记地理位置

    }, {
        key: "CHEKC_PROJECT_VALID",
        value: function CHEKC_PROJECT_VALID() {}
    }, {
        key: "BIND_ProjectValid",
        value: function BIND_ProjectValid() {
            //验证基础数据
            //CompanyCityName，PROJECTNAME，CASENAME，TRADERMODE，LOCATION,bjfq,PRINCIPALNAME,PROJECTADDRESS
            var th = this;
            var valid = {
                CITY: { //所属城市
                    required: true
                },
                PROJECTNAME: { //项目名称
                    required: true
                },
                CASENAME: {
                    required: true
                },
                TRADERMODE: {
                    required: true
                },
                PRINCIPALNAME: {
                    required: true
                },
                PROJECTADDRESS: {
                    required: true
                }
            };
            "CompanyCityName,PROJECTNAME,CASENAME,TRADERMODE,LOCATION,bjfq,PRINCIPALNAME,PROJECTADDRESS".split(",").forEach(function (el, ind) {
                $("#" + el).validatebox(valid[el]);
            });
        }
    }, {
        key: "BIND_VALID",
        value: function BIND_VALID() {
            //绑定验证
            return $("#FromProjectInfo").form("validate");
        }
    }, {
        key: "BIND_EditProject",
        value: function BIND_EditProject(event) {
            window.open(this.state.mapUrl + "/Admin/EditProject?project_id=" + this.state.ID + "&project_map_id=project" + this.state.ID + "&callback=callback");
        } //点击编辑项目总图

    }, {
        key: "BIND_maps",
        value: function BIND_maps() {
            window.open(this.state.mapUrl + "/Map/Project?project_id=" + this.state.ID + "&project_map_id=project" + this.state.ID + "&callback=callback");
        } //点击预览项目总图

    }, {
        key: "BIND_mapmark",
        value: function BIND_mapmark() {
            window.open(this.state.mapUrl + "/map/mapmark?project_id=" + this.state.ID + "&cityname=" + this.state.CompanyCityName + "&callback=callback");
        } //点击预览地理位置

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
                        "section",
                        { className: "staging-left boxSizing projectinFormation" },
                        _react2.default.createElement(
                            "from",
                            { id: "FromProjectInfo" },
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
                                            _react2.default.createElement("input", { readOnly: "readonly", id: "CompanyAreaName", value: this.state.CompanyAreaName || "", className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                            _react2.default.createElement("input", { readOnly: "readonly", id: "CompanyCityName", value: this.state.CompanyCityName || "", className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                                "\u6240\u5728\u57CE\u5E02"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(
                                                "div",
                                                { className: "postion" },
                                                _react2.default.createElement("input", { type: "text", readOnly: "true", onClick: this.EVENT_CLICK_CITYINPUT.bind(this, "ToolsCity"), id: "CITY", value: this.state.CITY || "", className: "inputTextBox boxSizing" }),
                                                _react2.default.createElement(_toolsCity2.default, { ref: "ToolsCity", callback: this.BIND_CITY_CALLBACK.bind(this) })
                                            )
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
                                            { id: "ObtainStatusName" },
                                            this.state.ObtainStatusName
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
                                            _react2.default.createElement("input", { onChange: this.BIND_CHECKPROJECTNAME.bind(this), id: "PROJECTNAME", value: this.state.PROJECTNAME || "", className: "inputTextBox boxSizing", type: "text" })
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
                                            _react2.default.createElement("input", { onChange: this.handleInputTextBlur.bind(this), id: "CASENAME", value: this.state.CASENAME || "", className: "inputTextBox boxSizing", type: "text" })
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
                                            _react2.default.createElement("input", { readOnly: "readonly", id: "EQUITYRATIO", value: this.state.EQUITYRATIO || "", className: "inputTextBox inputGray boxSizing", type: "text" }),
                                            _react2.default.createElement("i", { className: "symbol" })
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
                                            _react2.default.createElement("input", { readOnly: "readonly", id: "PROJECTCODE", value: this.state.PROJECTCODE || "", className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                                "\u5730\u7406\u4F4D\u7F6E"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(
                                                "button",
                                                { className: "btn btnStyle uploadIconBtn", onClick: this.BIND_EditMapMark.bind(this), id: "LOCATION" },
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
                                                "\u9879\u76EE\u8D1F\u8D23\u4EBA"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement("input", { readOnly: "readonly", onClick: this.handChooseTo.bind(this), id: "PRINCIPALNAME", value: this.state.PRINCIPALNAME || "", className: "inputTextBox boxSizing", type: "text" }),
                                            _react2.default.createElement("img", { className: "symbol headIcon", src: "../../Content/img/head-icon.png" })
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
                                                { className: "btn btnStyle uploadIconBtn", onClick: this.BIND_EditProject.bind(this), id: "bjfq" },
                                                "\u6807\u8BB0\u5206\u671F"
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
                                                "\u9879\u76EE\u5730\u5740"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            { colSpan: "3" },
                                            _react2.default.createElement("input", { onChange: this.handleInputTextChange.bind(this), id: "PROJECTADDRESS", value: this.state.PROJECTADDRESS || "", className: "inputTextBox boxSizing", type: "text" })
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
                            { id: "myCarousel", className: "carousel slide carouselStyle" },
                            _react2.default.createElement(
                                "div",
                                { className: "carousel-inner" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "item active" },
                                    _react2.default.createElement("img", { src: this.state.mapUrl + "/Content/maps/source/project" + this.state.ID + "_s.jpg", onError: this.xmViewError.bind(this), onClick: this.BIND_maps.bind(this), width: "100%", height: "295px" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "item", onClick: this.BIND_mapmark.bind(this) },
                                    _react2.default.createElement("iframe", { src: this.state.mapUrl + "/map/mapmark?project_id=" + this.state.ID, onError: this.xmViewError.bind(this), width: "350px", height: "295px" })
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

window["callback"] = function (str, data) {};
exports.default = NewProjectCount;

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
var update = __webpack_require__(608)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./city.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./city.less");
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

exports = module.exports = __webpack_require__(607)(undefined);
// imports


// module
exports.push([module.i, "/* 在city.js引入，城市控件 */\n.postion {\n  position: relative;\n  top: 0;\n  left: 0;\n}\n.ToolsCity {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 100;\n  background: rgba(255, 255, 255, 0.8);\n  border: #ccc solid 1px;\n}\n.ToolsCity .tc-header {\n  background: #f1f1f1;\n  border-bottom: #ccc solid 1px;\n  height: 29px;\n}\n.ToolsCity .tc-header li {\n  display: inline-block;\n  cursor: pointer;\n  padding: 2px 10px;\n  height: 26px;\n  border: transparent solid 1px;\n  margin-top: 3px;\n  color: #989898;\n}\n.ToolsCity .tc-header li:first-child {\n  margin-left: 20px;\n}\n.ToolsCity .tc-header li.active,\n.ToolsCity .tc-header li:hover {\n  border: #ccc solid 1px;\n  border-bottom: none;\n  background: #fff;\n  color: #5b5b5b;\n}\n.ToolsCity .tc-body {\n  width: 350px;\n  min-height: 200px;\n  overflow: hidden;\n  overflow-y: scroll;\n  padding: 5px;\n}\n.ToolsCity .tc-body ul li {\n  margin: 3px 0;\n}\n.ToolsCity .tc-body ul li span {\n  display: block;\n  float: left;\n  padding: 0 5px;\n  color: #00a5cc;\n}\n.ToolsCity .tc-body ul li ol {\n  vertical-align: top;\n  margin-left: 25px;\n}\n.ToolsCity .tc-body ul li ol li {\n  display: inline-block;\n  margin-right: 10px;\n  cursor: pointer;\n}\n.ToolsCity .tc-body ul li ol li:hover {\n  color: #f3a515;\n}\n", ""]);

// exports


/***/ })

});