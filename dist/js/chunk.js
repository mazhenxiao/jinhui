/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		11: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "chunk-" + ({"0":"component-newProject","1":"component-intallment","2":"component-identity","3":"component-index","4":"component-supply","5":"component-agenty","6":"component-todo","7":"component-projectList","9":"jinhui-Index","10":"jinhui-OpenIndex"}[chunkId]||chunkId) + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Content/dist/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'E:\\JHGroupTFS\\JH_POCS\\SourceCode\\POCS\\POCS.Web\\Content\\node_modules\\react\\react.js'");

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(78);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(543);

__webpack_require__(77);

var _iss = __webpack_require__(65);

var _iss2 = _interopRequireDefault(_iss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//公共类
_iss2.default.use({ Router: _reactRouter.Router, Route: _reactRouter.Route, hashHistory: _reactRouter.hashHistory });
/* 路由 */
//兼容ie
var rootRout = {
  path: "/",
  childRoutes: [{
    path: "/index",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(3).then((function (require) {
        var app = __webpack_require__(574); //============================生日祝福
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }, {
    path: "/identity",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(2).then((function (require) {
        var app = __webpack_require__(575); //============================生日祝福
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }, {
    path: "/supply",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(4).then((function (require) {
        var app = __webpack_require__(576); //============================生日祝福
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }, {
    path: "/projectList",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(7).then((function (require) {
        var app = __webpack_require__(577); //============================生日祝福
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }, //代办
  {
    path: "/agenty",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(5).then((function (require) {
        var app = __webpack_require__(578); //============================生日祝福
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }, //弹出层
  {
    path: "/todo",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(6).then((function (require) {
        var app = __webpack_require__(579); //============================生日祝福
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }, { //分期
    path: "/intallment",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(1).then((function (require) {
        var app = __webpack_require__(580); //============================分期
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }, { //项目
    path: "/newProject",
    getComponent: function getComponent(next, callback) {
      __webpack_require__.e/* require.ensure */(0).then((function (require) {
        var app = __webpack_require__(581); //============================分期
        callback(null, app.default);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
  }]
};
_reactDom2.default.render(_react2.default.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory, routes: rootRout }), document.querySelector("#JH-Router"));

exports.default = rootRout;

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'E:\\JHGroupTFS\\JH_POCS\\SourceCode\\POCS\\POCS.Web\\Content\\node_modules\\react-router\\es\\index.js'");

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $iss = function () {
    function $iss() {
        _classCallCheck(this, $iss);

        this.pagination();
    }

    _createClass($iss, [{
        key: "pagination",
        value: function pagination() {
            $.extend($.fn.pagination.defaults, {
                layout: ["first", "prev", "manual", "next", "last"],
                pageSize: 10, //每页显示的记录条数，默认为10 
                pageList: [5, 10, 15], //可以设置每页记录条数的列表 
                beforePageText: '第', //页数文本框前显示的汉字 
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
            });
        }
    }, {
        key: "getQuert",
        value: function getQuert(t) {
            var reg = new RegExp(t),
                me = reg.exec(location.hash);
            return me ? me : "";
        }
    }, {
        key: "guid",
        value: function guid() {
            //guid的生成
            var S4 = function S4() {
                return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
            };
            return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
        }
    }, {
        key: "ajax",
        value: function ajax(opt) {
            var th = this;
            var $o = JSON.parse(JSON.stringify(opt));
            $o["sucess"] && delete $o["sucess"];
            $o["error"] && delete $o["error"];
            var arg = {
                type: "POST",
                data: ""
            };
            $.extend(arg, $o);
            $.ajax(arg).done(function (da) {
                opt["sucess"] && opt.sucess(da);
            }).fail(function (e) {
                opt["error"] && opt.error(e);
            });
        }
    }, {
        key: "use",
        value: function use(arr) {
            Object.assign(this, arr);
        }
        /**
        * 图片加载
        */

    }, {
        key: "loadImag",
        value: function loadImag(ev) {
            var el = new Image(),
                $els = ev.currentTarget;
            el.addEventListener("error", function () {
                //console.log("error:"+$els.getAttribute("data-src"));
                //el.src = this.imgicon;
            });
            el.addEventListener("load", function () {
                // console.log("sucess:"+$els.getAttribute("data-src"));
                $els.src = $els.getAttribute("data-src");
            });
            el.src = $els.getAttribute("data-src");
        }
    }, {
        key: "Alert",
        value: function Alert(arg) {
            $(".modal").modal("hide");
            var opt = {
                title: "提示",
                content: "",
                width: "600px",
                height: "400px",
                ok: $.noop
            };
            $.extend(opt, arg);
            var str = "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" >\n        <div class=\"modal-dialog\" role=\"document\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n              <h4 class=\"modal-title\">" + opt.title + "</h4>\n            </div>\n            <div class=\"modal-body\" style=\"height:" + opt.height + "px;\">\n              <div>" + opt.content + "</div>\n            </div>\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-primary J_button\" >\u786E\u5B9A</button>\n            </div>\n          </div>\n        </div>\n      </div>";

            var $ele = $(str),
                s = $ele.width(),
                h = $ele.height();

            $("body").append($ele);
            $ele.css({
                width: opt.width,
                height: opt.height + 65 + 56,
                top: "20%",
                left: "50%",
                transform: "translate(-50%,-20%)"
            });
            $ele.modal({
                show: true
            }).on("click.modeclose", ".J_button", function () {
                // let opts = $(this).data("data");

                if (opt.ok() == false) {
                    return;
                }
                $ele.modal("hide");
            }).on("hide.bs.modal", function (arg) {
                $(".modal").remove();
                $(".modal-backdrop").remove();
            });
        }
    }, {
        key: "upload",
        value: function upload(arg) {
            var _this = this;

            var th = this;
            var str = "<section class=\"upload\">\n            <header><div id=\"uploadAddBTN\"></div><div class=\"uploadBtn J_uploadBtn hide\">\u4E0A\u4F20</div></header>\n            <ul class=\"uploadList\"></ul>\n        </section>";
            iss.Alert({
                title: "上传",
                width: 800,
                height: 400,
                content: str
            });
            var opt = {
                pick: {
                    id: '#uploadAddBTN',
                    label: '点击选择图片'
                },
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                // swf文件路径
                swf: "../source/webuploader-0.1.5/Uploader.swf",
                disableGlobalDnd: true,
                chunked: true,
                server: 'http://2betop.net/fileupload.php',
                fileNumLimit: 300,
                fileSizeLimit: 5 * 1024 * 1024, // 200 M
                fileSingleSizeLimit: 1 * 1024 * 1024 // 50 M  

            };
            $.extend(opt, arg || {});
            var addFile = function addFile($f) {
                var txt = "";
                if ($f.length) {
                    $f.forEach(function (el, ind) {
                        txt += "<li id=\"" + el.id + "\"><i  class=\"J_delete\">\u5220\u9664</i><span class='time'>" + new Date().Format("yyyy-MM-dd hh:mm:ss") + "</span><span class='size'>" + (el.size / 1024 / 1024).toFixed(2) + "M</span><span class=\"progresses\">0%</span><span class=\"txt\" type='" + el.type + "'>" + el.name + "</span></li>";
                    }, _this);
                }
                return txt;
                // uploadList.append(txt); 
            };

            setTimeout(function () {
                var uploader = th.uploader = WebUploader.create(opt),
                    list = $(".uploadList");
                uploader.on("filesQueued", function (file) {
                    var tt = addFile(file);
                    if (tt) {
                        $(".J_uploadBtn").removeClass("hide");
                        list.append(tt);
                    }
                });
                uploader.on("uploadError", function (f) {
                    $("#f.id").addClass("error");
                });
                uploader.on("uploadProgress", function (f) {});
                uploader.on("fileDequeued", function (f) {});
                list.on("click.upload", ".J_delete", function (e) {

                    var pa = $(e.currentTarget).parent(),
                        id = pa.attr("id");

                    uploader.removeFile(id, true);
                    pa.remove();
                    if (uploader.getFiles().length <= 0) {
                        $(".J_uploadBtn").addClass("hide");
                    }
                });
                $(document).on("click.upload", ".J_uploadBtn", function (e) {
                    var th = $(e.target);
                    if (th.hasClass("uploadBtn")) {
                        uploader.upload();
                    }
                });
            }, 500);
        }
    }, {
        key: "chooseTo",
        value: function chooseTo(arg) {
            //选人控件
            var th = this,
                str = "<section class=\"chooseTo\">\n        <div class=\"chooseToTree\">\n            \n            <input type=\"text\" class=\"chooseToSearch J_chooseToSearch\" />\n            <ul id=\"chooseToTreeUl\"></ul>\n        </div>\n        <div class=\"chooseToRight\">\n        <ul>\n         <%choosePepole%>\n        </ul>\n        </div>\n        <div class=\"chooseToBar\">\n           \n            <button type=\"button\" class=\"btn btn-info chooseToRemo\" >\u5168\u90E8\u79FB\u9664</button>\n        </div>\n       \n    </section>";
            var opt = {
                //url:"/Home/GetTreeInfo",//
                url: "/Com/IGetOrganizationalUsers",
                param: { parentid: "13ead391fd4103096735e4945339550b", condition: "" },
                title: "选择人员",
                width: 800,
                height: 300,
                content: str,
                pepole: {},
                data: [],
                search: "",
                callback: $.noop,
                ok: function ok() {
                    // console.log(opt.pepole);
                    $(window).trigger("chooseTo", opt.pepole);
                    opt.callback(opt.pepole);
                }
            };
            $.extend(opt, arg);
            var _s = "";
            for (var v in opt.pepole) {
                _s += "<li class=\"chooseTolist\"><li>";
            }
            opt.content = opt.content.replace(/<%choosePepole%>/ig, _s);
            iss.Alert(opt);
            var ele;
            var bindData = function bindData(to) {
                ele = $("#chooseToTreeUl");
                //opt.data = to;
                ele.tree({
                    url: "" + opt.url,
                    queryParams: opt.param,
                    type: "post",
                    onBeforeExpand: function onBeforeExpand(node) {
                        opt.param.parentid = node.id;
                        opt.param.condition = "";
                    },
                    onBeforeLoad: function onBeforeLoad(node, param) {
                        console.log(param);
                    },
                    onDblClick: function onDblClick(node) {

                        opt.pepole[node.id] = node;
                        render();
                    }
                });
                var render = function render(d) {
                    var rp = "",
                        $el = $(".chooseToRight ul");
                    $el.html("");
                    var op = opt.pepole;
                    for (var me in op) {

                        rp += "<li class=\"chooseTolist\" guid=\"" + me + "\">" + op[me]["text"] + "</li>";
                    }

                    $el.html(rp);
                };

                var time = void 0;
                $(".J_chooseToSearch").on("keyup", function (arg) {
                    var th = arg.target,
                        val = th.value;
                    clearTimeout(time);
                    time = setTimeout(function (a) {
                        // opt.search=val;
                        opt.param.parentid = "";
                        opt.param.condition = encodeURI(val);
                        ele.tree("reload");
                    }, 5000);
                });
                $(document).on("click.chooseTo", ".chooseToAdd,.chooseToRemo", function (ev) {
                    var th = $(ev.target);
                    if (th.hasClass("chooseToAdd")) {//新增

                    }
                    if (th.hasClass("chooseToRemo")) {
                        //删除
                        opt.pepole = {};
                        render();
                    }
                }).on("dblclick.chooseTo", ".chooseTolist", function (ev) {
                    console.log(ev);
                    var th = $(ev.target);
                    if (th.hasClass("chooseTolist")) {
                        //右侧选人
                        var guid = th.attr("guid");
                        delete opt.pepole[guid];
                        render();
                    }
                });
            };
            setTimeout(function () {
                bindData(); //绑定数据
            });
        }
    }]);

    return $iss;
}();

var iss = window["iss"] = new $iss();

;~function () {
    window.Date.prototype.Format = function (fmt) {
        //author: meizz 
        !fmt && (fmt = "yyyy-mm-dd");
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }return fmt;
    };
}();
exports.default = iss;

/***/ }),

/***/ 77:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'E:\\JHGroupTFS\\JH_POCS\\SourceCode\\POCS\\POCS.Web\\Content\\node_modules\\babel-polyfill\\lib\\index.js'");

/***/ }),

/***/ 78:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'E:\\JHGroupTFS\\JH_POCS\\SourceCode\\POCS\\POCS.Web\\Content\\node_modules\\react-dom\\index.js'");

/***/ })

/******/ });