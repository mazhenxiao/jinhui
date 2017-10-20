webpackJsonp([3],{

/***/ 608:
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

var _componentStageInforView = __webpack_require__(661);

var _componentStageInforView2 = _interopRequireDefault(_componentStageInforView);

var _componentStageMasView = __webpack_require__(662);

var _componentStageMasView2 = _interopRequireDefault(_componentStageMasView);

var _componentProcessApprovalTab = __webpack_require__(617);

var _componentProcessApprovalTab2 = _interopRequireDefault(_componentProcessApprovalTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 分期审核=只读基本信息*/
//兼容ie
/*分期信息*/
/*分期规划条件指标和分期占用土地*/


//导航信息


var StageControl = function (_React$Component) {
    _inherits(StageControl, _React$Component);

    function StageControl(arg) {
        _classCallCheck(this, StageControl);

        var _this = _possibleConstructorReturn(this, (StageControl.__proto__ || Object.getPrototypeOf(StageControl)).call(this, arg));

        _this.state = {
            versionId: "98b9d631-b31d-ef60-8fe5-4b837c53a37a", /*版本id*/
            projectid: "f7c938c9-a12b-45cd-8bdf-67c6152824e7", /*项目id*/
            reqtype: "Edit" /*请求类型*/
        };
        return _this;
    }

    _createClass(StageControl, [{
        key: "render",
        value: function render() {
            var th = this;
            var stateData = th.state;
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_componentProcessApprovalTab2.default, { current: "newProjectStage" }),
                _react2.default.createElement(_componentStageInforView2.default, { versionId: stateData.versionId, reqtype: stateData.reqtype, projectid: stateData.projectid }),
                _react2.default.createElement(_componentStageMasView2.default, { versionId: stateData.versionId, projectid: stateData.projectid })
            );
        }
    }]);

    return StageControl;
}(_react2.default.Component);

exports.default = StageControl;

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

/***/ 616:
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
            selected: {},
            readOnly: _this.props["readOnly"]
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
                if (_this2.state.readOnly) {
                    return _react2.default.createElement("input", { className: "", type: "text", readOnly: "true", value: el.val || "" });
                } else {
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

/***/ 617:
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*审批信息*/

/**
 * 首页导航条
 * index  identity  supply  所需
 */


//兼容ie

var ProcessApprovalTab = function (_React$Component) {
    _inherits(ProcessApprovalTab, _React$Component);

    function ProcessApprovalTab(arg) {
        _classCallCheck(this, ProcessApprovalTab);

        var _this = _possibleConstructorReturn(this, (ProcessApprovalTab.__proto__ || Object.getPrototypeOf(ProcessApprovalTab)).call(this, arg));

        _this.state = {
            TapList: [{ id: "ProcessApproval", url: "/ProcessApproval" }, //审批
            { id: "newProjectApproval", url: "/newProjectApproval" }, //项目
            { id: "newProjectStage", url: "/newProjectStage" //分期
            }]
        };
        return _this;
    }

    _createClass(ProcessApprovalTab, [{
        key: "setTapList",
        value: function setTapList() {
            var _this2 = this;

            //设置导航条

            return this.state.TapList.map(function (el, id) {
                var str = "";
                switch (el.id) {
                    case "ProcessApproval":
                        str = "流程审批";break;
                    case "newProjectApproval":
                        str = "项目信息";break;
                    case "newProjectStage":
                        str = "分期信息";break;
                }
                return _react2.default.createElement(
                    "li",
                    { className: _this2.props.current == el.id ? "active" : "", key: id, onClick: _this2.EVENT_CLICK_LINK.bind(_this2, el.url, el.id) },
                    str
                );
            });
        }
    }, {
        key: "EVENT_CLICK_LINK",
        value: function EVENT_CLICK_LINK(url, id, ev) {

            iss.hashHistory.push({ pathname: url, state: iss.id.id });
        }
    }, {
        key: "render",
        value: function render() {
            var th = this;
            return _react2.default.createElement(
                "section",
                null,
                _react2.default.createElement(
                    "header",
                    { className: "JH-HeadTab" },
                    _react2.default.createElement(
                        "ul",
                        { className: "JH-HeadList" },
                        this.setTapList()
                    )
                )
            );
        }
    }]);

    return ProcessApprovalTab;
}(_react2.default.Component);

exports.default = ProcessApprovalTab;

/***/ }),

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(632);
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
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./table.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./table.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(609)(undefined);
// imports


// module
exports.push([module.i, "/*table.less文件*/\n.builtTable {\n  margin-top: 10px;\n  font-size: 12px;\n  /*功能按钮*/\n  /*编辑*/\n  /*删除*/\n  /*查看*/\n}\n.builtTable thead tr td,\n.builtTable tbody tr td {\n  border: #ddd 1px solid;\n  vertical-align: middle;\n  text-align: center;\n}\n.builtTable thead tr {\n  border-top: 1px solid #ddd;\n  background: #f5f5f5;\n}\n.builtTable tbody tr {\n  background: #fff;\n}\n.builtTable tbody tr td {\n  padding: 4px;\n}\n.builtTable .funCla {\n  margin: 0 4px;\n}\n.builtTable .funCla_edit {\n  padding: 1px 2px;\n}\n.builtTable .funCla_edit {\n  padding: 1px 2px;\n}\n.builtTable .funCla_view {\n  padding: 1px 2px;\n}\n", ""]);

// exports


/***/ }),

/***/ 633:
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

__webpack_require__(634);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*选择地块-弹框*/
//兼容ie


var Winopen = function (_React$Component) {
    _inherits(Winopen, _React$Component);

    function Winopen(arg) {
        _classCallCheck(this, Winopen);

        var _this = _possibleConstructorReturn(this, (Winopen.__proto__ || Object.getPrototypeOf(Winopen)).call(this, arg));

        _this.state = {
            listArr: _this.props.selArr, /*地块信息*/
            selectId: _this.props.selId, /*选择过的地块*/
            status: _this.props.status /*选择select地块或编辑edit地块或查看view地块*/
        };

        return _this;
    }

    _createClass(Winopen, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var th = this;
            th.getAjax(th.props.guid);
        }
        /*绑定html*/

    }, {
        key: "BIND_BLOCK",
        value: function BIND_BLOCK() {
            var th = this;
            var list = th.state.listArr;
            var status = th.state.status;
            return list.map(function (obj, index) {
                return _react2.default.createElement(
                    "div",
                    { key: obj.ID, className: "aBuiltSection", id: "section" + obj.ID },
                    _react2.default.createElement(
                        "h3",
                        { className: "aBuilt_Title" },
                        _react2.default.createElement(
                            "span",
                            null,
                            obj.Name
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "radioSpan" },
                            _react2.default.createElement("input", { type: "radio", name: 'radio' + obj.ID, checked: obj.IsAllDevel == 2, disabled: status == "view", defaultValue: "2", onChange: th.evAllOrParDev.bind(th, obj.ID) }),
                            "\u90E8\u5206\u5F00\u53D1"
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "radioSpan" },
                            _react2.default.createElement("input", { type: "radio", name: 'radio' + obj.ID, checked: obj.IsAllDevel == 1, disabled: status == "view", defaultValue: "1", onChange: th.evAllOrParDev.bind(th, obj.ID) }),
                            "\u5168\u90E8\u5F00\u53D1"
                        )
                    ),
                    _react2.default.createElement(
                        "table",
                        { className: obj.IsAllDevel == 0 ? "table builtAlertTable hide" : "table builtAlertTable" },
                        _react2.default.createElement(
                            "tbody",
                            null,
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "\u5730\u5757\u540D\u79F0"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", id: obj.FieldList[0].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[0].edit == "+r", value: obj.FieldList[0].val == null ? "" : obj.FieldList[0].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[0].id) })
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "\u5730\u5757\u7F16\u7801"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", id: obj.FieldList[1].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[1].edit == "+r", value: obj.FieldList[1].val == null ? "" : obj.FieldList[1].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[1].id) })
                                ),
                                _react2.default.createElement("td", { colSpan: "2" })
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "\u603B\u7528\u5730\u9762\u79EF\uFF08\u33A1\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", id: obj.FieldList[2].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[2].edit == "+r", value: obj.FieldList[2].val == null ? "" : obj.FieldList[2].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[2].id) })
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        _react2.default.createElement(
                                            "span",
                                            { className: "red" },
                                            "*"
                                        ),
                                        "\u5EFA\u8BBE\u7528\u5730\u9762\u79EF\uFF08\u33A1\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", className: "comp-validatebox", "data-regExp": obj.FieldList[3].regExp, autoComplete: "off", id: obj.FieldList[3].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[3].edit == "+r", value: obj.FieldList[3].val == null ? "" : obj.FieldList[3].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[3].id) })
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        _react2.default.createElement(
                                            "span",
                                            { className: "red" },
                                            "*"
                                        ),
                                        "\u4EE3\u5F81\u7528\u5730\u9762\u79EF\uFF08\u33A1\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", className: "comp-validatebox", "data-regExp": obj.FieldList[4].regExp, autoComplete: "off", id: obj.FieldList[4].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[4].edit == "+r", value: obj.FieldList[4].val == null ? "" : obj.FieldList[4].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[4].id) })
                                )
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        _react2.default.createElement(
                                            "span",
                                            { className: "red" },
                                            "*"
                                        ),
                                        "\u8BA1\u5BB9\u5EFA\u7B51\u9762\u79EF\uFF08\u33A1\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", className: "comp-validatebox", "data-regExp": obj.FieldList[5].regExp, autoComplete: "off", id: obj.FieldList[5].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[5].edit == "+r", value: obj.FieldList[5].val == null ? "" : obj.FieldList[5].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[5].id) })
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        _react2.default.createElement(
                                            "span",
                                            { className: "red" },
                                            "*"
                                        ),
                                        "\u571F\u5730\u83B7\u53D6\u4EF7\u6B3E\uFF08\u4E07\u5143\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", className: "comp-validatebox", "data-regExp": obj.FieldList[6].regExp, autoComplete: "off", id: obj.FieldList[6].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[6].edit == "+r", value: obj.FieldList[6].val == null ? "" : obj.FieldList[6].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[6].id) })
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "\u697C\u9762\u5747\u4EF7\uFF08\u5143/\u33A1\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", disabled: status == "view", id: obj.FieldList[7].id + '_' + obj.ID, readOnly: obj.IsAllDevel == 0 || obj.IsAllDevel == 1 || obj.IsAllDevel == 2 && obj.FieldList[7].edit == "+r", value: obj.FieldList[7].val == null ? "" : obj.FieldList[7].val, onChange: th.evInputChange.bind(th, obj.ID, obj.FieldList[7].id) })
                                )
                            )
                        )
                    )
                );
            });
        }
        /*input 校验*/

    }, {
        key: "evValiteInputbox",
        value: function evValiteInputbox() {
            setTimeout(function () {
                $(".comp-validatebox").each(function (index, ele) {
                    var eleDom = $(ele);
                    var isReadAt = eleDom.attr("readonly");

                    var regInforObj = JSON.parse(eleDom.attr("data-regExp"));
                    console.log(regInforObj);
                    var allKeys = Object.keys(regInforObj);
                    var validTypeRule = [];
                    var valideRule = {
                        required: true
                    };

                    allKeys.forEach(function (vType) {
                        if (vType == "max") {
                            validTypeRule.push('number', 'max[' + regInforObj[vType] + ']');
                        }
                    });
                    if (validTypeRule.length > 0) {
                        valideRule.validType = validTypeRule;
                    }
                    eleDom.validatebox(valideRule);
                });
            }, 600);
        }
        /*input change*/

    }, {
        key: "evInputChange",
        value: function evInputChange(listId, fieldId, event) {
            var th = this;
            var list = th.state.listArr;
            var newList = [];
            var val = event.target.value;
            list.forEach(function (obj, index) {
                if (obj.ID == listId) {
                    obj.FieldList.forEach(function (feildObj, fIndex) {
                        if (feildObj.id == fieldId) {
                            feildObj.text = val;
                            feildObj.val = val;
                        }
                    });
                    /*计算*/
                    obj.FieldList.forEach(function (feildObj, fIndex) {
                        if (feildObj.exec) {
                            var newVal = th.evCalcContent(feildObj.exec, obj.FieldList);
                            var newCalArr = newVal.toString().split(".");
                            var decVal = "";
                            if (newCalArr.length == 2) {
                                decVal = '.' + newCalArr[1].slice(0, 6);
                            }
                            feildObj.text = newCalArr[0] + decVal;
                            feildObj.val = newCalArr[0] + decVal;
                        }
                    });
                }
                newList.push(obj);
            });
            th.setState({
                listArr: newList
            });
        }
        /*计算值，返回计算后的数组*/

    }, {
        key: "evCalBackArr",
        value: function evCalBackArr(filterArr) {
            var newArr = [];
            var th = this;

            /*计算*/
            filterArr.forEach(function (obj, index) {
                obj.FieldList.forEach(function (feildObj, fIndex) {
                    if (feildObj.exec) {
                        var newVal = th.evCalcContent(feildObj.exec, obj.FieldList);
                        var newCalArr = newVal.toString().split(".");
                        var decVal = "";
                        if (newCalArr.length == 2) {
                            decVal = '.' + newCalArr[1].slice(0, 6);
                        }
                        feildObj.text = newCalArr[0] + decVal;
                        feildObj.val = newCalArr[0] + decVal;
                    }
                });
                newArr.push(obj);
            });
            return newArr;
        }
        /*计算表达式*/

    }, {
        key: "evCalcContent",
        value: function evCalcContent(execStr, obj) {
            var val = "";
            obj.forEach(function (item, index) {
                var regStr = new RegExp("{" + item.id + "}", "ig");
                execStr = execStr.replace(regStr, Number(item.val));
            });
            var blockStr = "try{\
            let calVal=" + execStr + ";\
            return calVal==Infinity?0:calVal;\
        }catch(e){console.log(e);}";
            console.log(blockStr);
            return new Function(blockStr)();
        }
        /*点击全部开发或部分开发*/

    }, {
        key: "evAllOrParDev",
        value: function evAllOrParDev(listId, event) {
            var th = this;
            var list = th.state.listArr;
            var newList = [];
            var val = event.target.value;
            list.forEach(function (obj, index) {
                if (obj.ID == listId) {
                    obj.IsAllDevel = val;
                    if (val == 0 || val == 1) {
                        $("#section" + obj.ID + " .comp-validatebox").validatebox("disableValidation");
                    } else {
                        $("#section" + obj.ID + " .comp-validatebox").validatebox("enableValidation");
                    }
                }
                newList.push(obj);
            });
            th.setState({
                listArr: newList
            });

            th.props.callback(newList);
        }
    }, {
        key: "getAjax",
        value: function getAjax(id) {
            var th = this;
            /*如果是编辑，则不请求数据*/
            var status = th.state.status;
            var listArr = th.state.listArr;
            if (status == "edit" || status == "view") {
                th.setState({
                    "listArr": th.evCalBackArr(listArr)
                });
                th.evValiteInputbox();
                return false;
            }
            iss.ajax({
                url: "/Stage/IGetLandQuotaByProId",
                type: "get",
                data: { projectId: id },
                success: function success(d) {
                    var filterList = [];
                    filterList = d.rows.filter(function (obj, index) {
                        return !new RegExp(obj.ID, "ig").test(th.state.selectId);
                    });

                    th.setState({
                        "listArr": th.evCalBackArr(filterList)
                    });

                    th.evValiteInputbox();
                },
                error: function error(d) {
                    console.log(JSON.stringify(d));
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var th = this;

            return _react2.default.createElement(
                "div",
                { className: "aBuiltMain" },
                _react2.default.createElement(
                    "form",
                    { id: "form_aBuiltLand" },
                    this.BIND_BLOCK()
                )
            );
        }
    }]);

    return Winopen;
}(_react2.default.Component);

{/* <div className="aBuiltSection">
       <div className="aBuilt_Title">
           <span>世界城-A地块</span>
           <span className="radioSpan"><input type="radio" name="lang" defaultValue="01"/>全部开发</span>
           <span className="radioSpan"><input type="radio" name="lang" defaultValue="02"/>部分开发</span>
       </div>
       <ul className="aBuilt_Con">
           <li><label htmlFor="">地块名称</label><input type="text" id="" defaultValue="地块一"/></li>
           <li><label>地块编码</label><input type="text" defaultValue="地块一"/></li>
           <li><label>地块名称</label><input type="text" defaultValue="地块一"/></li>
           <li><label>地块编码</label><input type="text" defaultValue="地块一"/></li>
           <li><label>地块编码</label><input type="text" defaultValue="地块一"/></li>
       </ul>
       <ul className={obj.IsAllDevel==0? "aBuilt_Con hide":"aBuilt_Con"}>
           {
               obj.FieldList.map((fieldObj,fIndex)=>{
                   return <li key={fieldObj.id}>
                               <label><span className={fieldObj.regExp.length>3&&!fieldObj.exec?"red":"hide"}>*</span>{fieldObj.label}</label>
                               <input type="text" className={fieldObj.regExp.length>3&&!fieldObj.exec?"comp-validatebox":""} id={fieldObj.id+'_'+obj.ID} data-regExp={fieldObj.regExp} autoComplete="off" readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&fieldObj.edit=="+r"} value={fieldObj.val==null?"":fieldObj.val} onChange={th.evInputChange.bind(th,obj.ID,fieldObj.id)}/>
                               <span className="unitSpan">{fieldObj.unit?fieldObj.unit:""}</span>
                           </li>
               })
           }
       </ul>
    </div> */}
{
    // <div className="aBuilt_Title">
    //     <span>{obj.Name}</span>
    //     <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==1} defaultValue="1" onChange={th.evAllOrParDev.bind(th,obj.ID)} />全部开发</span>
    //     <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==2} defaultValue="2" onChange={th.evAllOrParDev.bind(th,obj.ID)} />部分开发</span>
    // </div>
    // <table className={obj.IsAllDevel==0? "table builtAlertTable hide":"table builtAlertTable"}>
    //     <tbody>

    //         <tr>
    //             <td><label>地块名称</label></td>
    //             <td><input type="text" id={obj.FieldList[0].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[0].edit=="+r"} value={obj.FieldList[0].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[0].id)}/></td>
    //             <td><label>地块编码</label></td>
    //             <td><input type="text" id={obj.FieldList[1].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[1].edit=="+r"} value={obj.FieldList[1].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[1].id)}/></td>
    //             <td colSpan="2"></td>
    //         </tr>
    //         <tr>
    //             <td><label>总用地面积（㎡）</label></td>
    //             <td><input type="text" id={obj.FieldList[2].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[2].edit=="+r"} value={obj.FieldList[2].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[2].id)}/></td>
    //             <td><label><span className="red">*</span>建设用地面积（㎡）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[3].regExp} autoComplete="off" id={obj.FieldList[3].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[3].edit=="+r"} value={obj.FieldList[3].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[3].id)}/></td>
    //             <td><label><span className="red">*</span>代征用地面积（㎡）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[4].regExp} autoComplete="off" id={obj.FieldList[4].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[4].edit=="+r"} value={obj.FieldList[4].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[4].id)}/></td>
    //         </tr>
    //         <tr>
    //             <td><label><span className="red">*</span>计容建筑面积（㎡）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[5].regExp} autoComplete="off" id={obj.FieldList[5].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[5].edit=="+r"} value={obj.FieldList[5].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[5].id)}/></td>
    //             <td><label><span className="red">*</span>土地获取价款（万元）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[6].regExp} autoComplete="off" id={obj.FieldList[6].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[6].edit=="+r"} value={obj.FieldList[6].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[6].id)}/></td>
    //             <td><label>楼面均价（元/㎡）</label></td>
    //             <td><input type="text" id={obj.FieldList[7].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[7].edit=="+r"} value={obj.FieldList[7].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[7].id)}/></td>
    //         </tr>
    //     </tbody>
    // </table>
}
exports.default = Winopen;

/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(635);
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
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./aBuilt.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./aBuilt.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(609)(undefined);
// imports


// module
exports.push([module.i, "/*aBuilt.less文件*/\n.modal-title {\n  font-size: 16px;\n}\n.aBuiltMain {\n  padding: 0 20px 20px;\n  font-size: 12px;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  height: 400px;\n}\n.aBuiltMain .aBuilt_Title {\n  width: 100%;\n  font-size: 14px;\n  margin: 12px 0 2px;\n  line-height: 40px;\n  border-bottom: 1px solid #c9c9c9;\n}\n.aBuiltMain .aBuilt_Title span {\n  display: inline-block;\n}\n.aBuiltMain .aBuilt_Title span:first-child {\n  line-height: 38px;\n  margin-right: 16px;\n  padding-right: 10px;\n  border-bottom: 2px solid #31395d;\n}\n.aBuiltMain .aBuilt_Title span.radioSpan {\n  float: right;\n  margin-left: 16px;\n}\n.aBuiltMain .aBuilt_Title span.radioSpan input[type=radio] {\n  margin: 0;\n  vertical-align: middle;\n}\n.aBuiltMain .aBuilt_Con {\n  height: auto;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n.aBuiltMain .aBuilt_Con li {\n  position: relative;\n  float: left;\n  width: 33.33%;\n  min-height: 30px;\n  line-height: 30px;\n  margin-top: 5px;\n  padding-left: 110px;\n  padding-right: 5px;\n}\n.aBuiltMain .aBuilt_Con li label {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 110px;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  font-weight: normal;\n  margin-bottom: 0px;\n  padding-right: 6px;\n  text-align: right;\n}\n.aBuiltMain .aBuilt_Con li input {\n  border: #ddd solid 1px;\n  width: 100%;\n  max-width: 160px;\n  height: 28px;\n}\n.aBuiltMain .aBuilt_Con li input[readonly] {\n  background: #ddd;\n}\n.aBuiltMain .aBuilt_Con li .unitSpan {\n  position: relative;\n  right: 0;\n  top: 50%;\n  padding-left: 3px;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  text-align: left;\n}\n.aBuiltMain .aBuilt_Con li:nth-child(2) {\n  width: 66.67%;\n}\n.aBuiltMain .aBuilt_Con.hide {\n  display: none;\n}\n.aBuiltMain .builtAlertTable {\n  margin-top: 10px;\n  margin-bottom: 0;\n  font-size: 12px;\n}\n.aBuiltMain .builtAlertTable tr {\n  background: #fff;\n}\n.aBuiltMain .builtAlertTable td {\n  border: none;\n  vertical-align: middle;\n  text-align: left;\n  padding: 0;\n}\n.aBuiltMain .builtAlertTable thead tr {\n  border-top: 1px solid #ccc;\n  background: #f5f5f5;\n}\n.aBuiltMain .builtAlertTable tbody label {\n  font-weight: normal;\n  margin-bottom: 0px;\n  padding-right: 6px;\n  text-align: right;\n  width: 100%;\n}\n.aBuiltMain .builtAlertTable tbody input {\n  border: none;\n  height: 28px;\n  width: auto;\n  width: -moz-calc(96%);\n  width: -webkit-calc(96%);\n  width: calc(96%);\n  margin: 2px;\n  border: 1px solid #ddd;\n}\n.aBuiltMain .builtAlertTable tbody input[readonly] {\n  background: #eee;\n}\n.aBuiltMain .builtAlertTable.hide {\n  display: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(642);
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
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./view.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./view.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(609)(undefined);
// imports


// module
exports.push([module.i, "/*stageView.less*/\n.stageVWrap {\n  height: auto;\n  overflow-y: hidden;\n  overflow-x: auto;\n}\n.stageVWrap .stageVLeft {\n  float: left;\n  width: 66.6%;\n  margin-top: 10px;\n  padding-right: 20px;\n}\n.stageVWrap .stageVLeft .stageVTable {\n  width: 100%;\n  font-size: 12px;\n  text-align: center;\n}\n.stageVWrap .stageVLeft .stageVTable td {\n  border: 1px solid #ddd;\n  padding: 6px;\n}\n.stageVWrap .stageVLeft .stageVTable .stageViewTitle {\n  color: #064a8b;\n}\n.stageVWrap .stageVLeft .stageVTable .stageViewCon {\n  color: #333;\n}\n.stageVWrap .stageVRight {\n  float: right;\n  margin-top: 10px;\n  width: 33.3%;\n  height: 295px;\n  border: 1px solid #dddddd;\n}\n", ""]);

// exports


/***/ }),

/***/ 661:
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

__webpack_require__(641);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 分期信息*/
//兼容ie


var StageInforView = function (_React$Component) {
    _inherits(StageInforView, _React$Component);

    function StageInforView(arg) {
        _classCallCheck(this, StageInforView);

        var _this = _possibleConstructorReturn(this, (StageInforView.__proto__ || Object.getPrototypeOf(StageInforView)).call(this, arg));

        _this.state = {
            "versionId": _this.props.versionId,
            "projectid": _this.props.projectid,
            "reqtype": _this.props.reqtype,
            "CASENAME": "",
            "STAGENAME": "",
            "PROJECTCOMPANYNAME": "",
            "STAGECODE": "",
            "STAGEID": "",
            "STATUS": "",
            "ISELFPRODUCTTYPE": "",
            "TRADERMODE": "",
            "MERGEWAY": "",
            "PROJECTTYPE": "",
            "TAXINGWAY": "",
            "PLANSTAGE": "",
            "PROJECTNAME": "",
            "PRINCIPALNAME": "",
            "PRINCIPAL": "",
            "ID": "",
            "GROUPNUMBER": "",
            "STAGECREATEDATE": "1900-01-01T00:00:00",
            "STAGEUPDATEDATE": "1900-01-01T00:00:00",
            "STARTDATE": "1900-01-01T00:00:00",
            "mapUrl": "http://192.168.10.164:82",
            "iframeURL1": "",
            "iframeURL2": ""
        };
        return _this;
    }

    _createClass(StageInforView, [{
        key: "getAjax",
        value: function getAjax(callback) {
            var th = this;
            iss.ajax({ //获取数据
                type: "post",
                url: "/Stage/IGetInitInfo",
                data: {
                    projectId: th.state.projectid,
                    Id: th.state.versionId,
                    reqtype: th.state.reqtype
                },
                success: function success(res) {
                    //console.log(res.rows);
                    var STAGESELFPRODUCTS = res.rows.BaseFormInfo.STAGESELFPRODUCTS,
                        ISELFPRODUCTTYPE = res.rows.SelectOptions.ISELFPRODUCTTYPE,
                        str = STAGESELFPRODUCTS.join(",");
                    var valFilter = [];
                    ISELFPRODUCTTYPE.forEach(function (obj) {
                        if (str.indexOf(obj.val) > -1) {
                            valFilter.push(obj.label);
                        }
                    });
                    var MERGEWAY = res.rows.SelectOptions.MERGEWAY,
                        MERGEWAYSTR = res.rows.BaseFormInfo.MERGEWAY,
                        MERGEWAYVAL = "";
                    MERGEWAY.forEach(function (obj) {
                        if (MERGEWAYSTR.indexOf(obj.val) > -1) {
                            MERGEWAYVAL = obj.label;
                        }
                    });

                    var PLANSTAGE = res.rows.SelectOptions.PLANSTAGE,
                        PLANSTAGESTR = res.rows.BaseFormInfo.PLANSTAGE,
                        PLANSTAGEVAL = "";
                    PLANSTAGE.forEach(function (obj) {
                        if (PLANSTAGESTR.indexOf(obj.val) > -1) {
                            PLANSTAGEVAL = obj.label;
                        }
                    });

                    var STATUS = "";
                    if (res.rows.BaseFormInfo.STATUS == "" || res.rows.BaseFormInfo.STATUS == null) {
                        STATUS = "";
                    } else {
                        STATUS = res.rows.SelectOptions.STATUS[res.rows.BaseFormInfo.STATUS].label;
                    }

                    var TRADERMODE = "";
                    if (res.rows.BaseFormInfo.TRADERMODE == "" || res.rows.BaseFormInfo.TRADERMODE == null) {
                        TRADERMODE = "";
                    } else {
                        TRADERMODE = res.rows.SelectOptions.TRADERMODE[res.rows.BaseFormInfo.TRADERMODE].label;
                    }

                    var PROJECTTYPE = "";
                    if (res.rows.BaseFormInfo.PROJECTTYPE == "" || res.rows.BaseFormInfo.PROJECTTYPE == null) {
                        PROJECTTYPE = "";
                    } else {
                        PROJECTTYPE = res.rows.SelectOptions.PROJECTTYPE[res.rows.BaseFormInfo.PROJECTTYPE].label;
                    }

                    var TAXINGWAY = "";
                    if (res.rows.BaseFormInfo.TAXINGWAY == "" || res.rows.BaseFormInfo.TAXINGWAY == null) {
                        TAXINGWAY = "";
                    } else {
                        TAXINGWAY = res.rows.SelectOptions.TAXINGWAY[res.rows.BaseFormInfo.TAXINGWAY].label;
                    }

                    th.setState({
                        "CASENAME": res.rows.BaseFormInfo.CASENAME, //分期案名
                        "STAGENAME": res.rows.BaseFormInfo.STAGENAME, //分期名称
                        "PROJECTCOMPANYNAME": res.rows.BaseFormInfo.PROJECTCOMPANYNAME, //项目公司名称
                        "STAGEID": res.rows.BaseFormInfo.STAGEID,
                        "STAGECREATEDATE": res.rows.BaseFormInfo.STAGECREATEDATE, //分期创建日期
                        "STAGEUPDATEDATE": res.rows.BaseFormInfo.STAGEUPDATEDATE, //分期更新日期
                        "STARTDATE": res.rows.BaseFormInfo.STARTDATE, //启动开发时间
                        "STAGECODE": res.rows.BaseFormInfo.STAGECODE, //分期编码
                        "STATUS": STATUS, //分期状态
                        "ISELFPRODUCTTYPE": res.rows.BaseFormInfo.ISELFPRODUCTTYPE,
                        "TRADERMODE": TRADERMODE, //操盘方式
                        "MERGEWAY": MERGEWAYVAL, //并表方式
                        "PROJECTTYPE": PROJECTTYPE, //项目类型
                        "TAXINGWAY": TAXINGWAY, //项目计税方式
                        "PLANSTAGE": PLANSTAGEVAL, //计划管控阶段
                        "PROJECTID": res.rows.BaseFormInfo.PROJECTID,
                        "PROJECTNAME": res.rows.BaseFormInfo.PROJECTNAME, //项目名称
                        "ID": res.rows.BaseFormInfo.ID,
                        "PRINCIPALNAME": res.rows.BaseFormInfo.PRINCIPALNAME,
                        "PRINCIPAL": res.rows.BaseFormInfo.PRINCIPAL,
                        "GROUPNUMBER": res.rows.BaseFormInfo.GROUPNUMBER, //组团数量
                        "STAGEVERSIONID": res.rows.BaseFormInfo.STAGEVERSIONID,
                        "STAGESELFPRODUCTS": valFilter.join(",") //自持业态

                        //"TRADERMODE":res.rows.SelectOptions.TRADERMODE[res.rows.BaseFormInfo.Project.TRADERMODE].label,//操盘方式                    
                    }, function (arg) {
                        //console.log(th.state)
                        if (callback) {
                            callback();
                        }
                    });
                },
                error: function error(e) {}
            });
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.getAjax(function (arg) {
                _this2.BIND_ONLOAD(); //加载分期总图，推盘图
                setTimeout(function () {
                    document.getElementById('iframe2').src = $("#iframe2").attr("src");
                }, 3000);
            });
        }
    }, {
        key: "BIND_ONLOAD",
        value: function BIND_ONLOAD(event) {
            var th = this;
            iss.ajax({ //获取数据 判断有无分期总图、推盘图
                type: "post",
                url: "/Common/IsHaveXMView",
                data: {
                    typeinfo: "2",
                    strId: th.state.STAGEVERSIONID
                },
                success: function success(res) {
                    if (res == false) {
                        th.setState({
                            iframeURL1: "../../Content/img/xmViewError.png",
                            iframeURL2: "../../Content/img/xmViewError.png"
                        });
                    } else {
                        th.setState({
                            iframeURL1: th.state.mapUrl + "/Map/Stage?stage_id=" + th.state.STAGEVERSIONID + "&stage_map_id=stage" + th.state.STAGEVERSIONID,
                            iframeURL2: th.state.mapUrl + "/Map/PUSHPLATE?stage_id=" + th.state.STAGEVERSIONID + "&stage_map_id=stage" + th.state.STAGEVERSIONID
                        });
                    }
                },
                error: function error(e) {}
            });
        } //加载iframe url 分期总图，推盘图

    }, {
        key: "xmViewError",
        value: function xmViewError(event) {
            // this.attr("src","../img/xmViewError.png")
            $(event.target).attr("src", "../../Content/img/xmViewError.png");
        }
    }, {
        key: "render",
        value: function render() {
            var th = this.state;
            var STAGECREATEDATE = th.STAGECREATEDATE == "1900-01-01T00:00:00" ? "" : this.state.STAGECREATEDATE.split("T")[0];
            var STAGEUPDATEDATE = th.STAGEUPDATEDATE == "1900-01-01T00:00:00" ? "" : this.state.STAGEUPDATEDATE.split("T")[0];
            var STARTDATE = th.STARTDATE == "1900-01-01T00:00:00" ? "" : this.state.STARTDATE.split("T")[0];
            return _react2.default.createElement(
                "div",
                { id: "stageInforView" },
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
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "stageVWrap" },
                    _react2.default.createElement(
                        "div",
                        { className: "stageVRight" },
                        _react2.default.createElement(
                            "div",
                            { id: "myCarousel", className: "carousel slide carouselStyle" },
                            _react2.default.createElement(
                                "div",
                                { className: "carousel-inner" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "item active" },
                                    _react2.default.createElement("iframe", { ref: "iframe", id: "iframe1", src: this.state.iframeURL1, onError: this.xmViewError.bind(this), frameBorder: "0", marginHeight: "0", marginWidth: "0", scrolling: "no", width: "100%", height: "291" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "item" },
                                    _react2.default.createElement("iframe", { ref: "iframe", id: "iframe2", src: this.state.iframeURL2, onError: this.xmViewError.bind(this), frameBorder: "0", marginHeight: "0", marginWidth: "0", scrolling: "no", width: "100%", height: "291" })
                                )
                            ),
                            _react2.default.createElement("a", { className: "carousel-control left glyphicon glyphicon-menu-left", href: "#myCarousel",
                                "data-slide": "prev" }),
                            _react2.default.createElement("a", { className: "carousel-control right glyphicon glyphicon-menu-right", href: "#myCarousel",
                                "data-slide": "next" })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "stageVLeft" },
                        _react2.default.createElement(
                            "table",
                            { className: "stageVTable" },
                            _react2.default.createElement(
                                "tbody",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u9879\u76EE\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.PROJECTNAME
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u5206\u671F\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.STAGENAME
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u5206\u671F\u6848\u540D"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.CASENAME
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u5206\u671F\u7F16\u7801"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.STAGECODE
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u5206\u671F\u72B6\u6001"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.STATUS
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u81EA\u6301\u4E1A\u6001"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.STAGESELFPRODUCTS
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u64CD\u76D8\u65B9\u5F0F"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.TRADERMODE
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u9879\u76EE\u516C\u53F8\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.PROJECTCOMPANYNAME
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u9879\u76EE\u8D1F\u8D23\u4EBA"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.PRINCIPALNAME
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u6743\u76CA\u6BD4\u4F8B"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.equityTxt
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u5E76\u8868\u65B9\u5F0F"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.MERGEWAY
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u9879\u76EE\u7C7B\u578B"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.PROJECTTYPE
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u9879\u76EE\u8BA1\u7A0E\u65B9\u5F0F"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.TAXINGWAY
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u5206\u671F\u521B\u5EFA\u65E5\u671F"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        STAGECREATEDATE
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u5206\u671F\u66F4\u65B0\u65E5\u671F"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        STAGEUPDATEDATE
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u8BA1\u5212\u7BA1\u63A7\u9636\u6BB5"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.PLANSTAGE
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u542F\u52A8\u5F00\u53D1\u65F6\u95F4"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        STARTDATE
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewTitle" },
                                        "\u7EC4\u56E2\u6570\u91CF"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { className: "stageViewCon" },
                                        th.GROUPNUMBER
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return StageInforView;
}(_react2.default.Component);

exports.default = StageInforView;

/***/ }),

/***/ 662:
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

__webpack_require__(631);

var _toolsDynamicTable = __webpack_require__(616);

var _toolsDynamicTable2 = _interopRequireDefault(_toolsDynamicTable);

var _componentIndicatorsWinopen = __webpack_require__(633);

var _componentIndicatorsWinopen2 = _interopRequireDefault(_componentIndicatorsWinopen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 分期规划条件指标和分期占用土地*/
//兼容ie
/*表格*/


//弹出选择地块

var StageMasView = function (_React$Component) {
    _inherits(StageMasView, _React$Component);

    function StageMasView(arg) {
        _classCallCheck(this, StageMasView);

        var _this = _possibleConstructorReturn(this, (StageMasView.__proto__ || Object.getPrototypeOf(StageMasView)).call(this, arg));

        _this.state = {
            versionId: _this.props.versionId, /*版本id*/
            projectid: _this.props.projectid, /*项目id*/
            landList: [], /*地块信息*/
            landStageObj: {}, /*相关分期*/
            sumLandData: [] /*汇总信息*/
        };
        return _this;
    }
    /*查看地块信息*/


    _createClass(StageMasView, [{
        key: 'evViewLandInfor',
        value: function evViewLandInfor(obj) {
            var th = this;
            var selArr = [obj];
            iss.Alert({
                title: "查看分期占用土地",
                width: 1000,
                height: 400,
                content: '<div id="alertBuiltBlock"></div>'
            });

            _reactDom2.default.render(_react2.default.createElement(_componentIndicatorsWinopen2.default, { guid: '', selId: '', selArr: selArr, status: 'view', callback: th.evCallBackLand.bind(th) }), document.querySelector("#alertBuiltBlock"));
        }
        /*地块查看回调函数*/

    }, {
        key: 'evCallBackLand',
        value: function evCallBackLand() {}
        /*汇总地块信息*/

    }, {
        key: 'evSunLand',
        value: function evSunLand(listData) {
            var th = this;
            iss.ajax({
                url: "/Stage/IRetLandDynaticFieldSum",
                type: "post",
                data: {
                    data: JSON.stringify(listData)
                },
                success: function success(d) {
                    console.log("分期规划条件指标/汇总数据=========");
                    console.log(d.rows);
                    th.setState({
                        sumLandData: d.rows
                    });
                },
                error: function error(d) {
                    console.log(JSON.stringif(d));
                }
            });
        }
        /*加载地块信息*/

    }, {
        key: 'evLoadLand',
        value: function evLoadLand() {
            var th = this;
            iss.ajax({
                url: "/Stage/IGetLandQuotaByVersionId",
                type: "get",
                data: {
                    versionId: th.state.versionId,
                    projectid: th.state.projectid
                },
                success: function success(d) {
                    var landArr = d.rows;
                    th.setState({
                        landList: landArr
                    });
                    th.evSunLand(landArr);
                },
                error: function error(d) {
                    console.log(JSON.stringify(d));
                }
            });
        }
        /*加载地块相关分期*/

    }, {
        key: 'evIGetLandStageShow',
        value: function evIGetLandStageShow() {
            var th = this;
            iss.ajax({
                url: "/Stage/IGetLandStageShow",
                type: "get",
                data: {
                    projectid: th.state.projectid
                },
                success: function success(d) {
                    th.setState({
                        landStageObj: d.rows
                    });
                },
                error: function error(d) {
                    console.log(JSON.stringify(d));
                }
            });
        }
        /*渲染地块信息*/

    }, {
        key: 'loadLandHtml',
        value: function loadLandHtml() {
            var th = this;
            var landList = th.state.landList;
            var landStageObj = th.state.landStageObj;

            return landList.map(function (obj, index) {
                return _react2.default.createElement(
                    'tr',
                    { id: obj.ID, key: obj.ID },
                    _react2.default.createElement(
                        'td',
                        null,
                        index + 1
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        obj.Name
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        obj.FieldList[1].val
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        obj.IsAllDevel == 1 ? "是" : "否"
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        obj.FieldList[2].val
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        obj.FieldList[5].val
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        landStageObj[obj.ID]
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'funCla funCla_view', onClick: th.evViewLandInfor.bind(th, obj) },
                            '\u67E5\u770B'
                        )
                    )
                );
            });
        }
        /*dom渲染完成*/

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var th = this;
            th.evLoadLand();
            th.evIGetLandStageShow();
        }
    }, {
        key: 'render',
        value: function render() {
            var th = this;
            return _react2.default.createElement(
                'div',
                { id: 'stageMasView' },
                _react2.default.createElement(
                    'h3',
                    { className: 'boxGroupTit' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u5206\u671F\u89C4\u5212\u6761\u4EF6\u6307\u6807'
                        )
                    )
                ),
                _react2.default.createElement(_toolsDynamicTable2.default, { pid: iss.guid(), DynamicData: th.state.sumLandData, CallBack: '' }),
                _react2.default.createElement(
                    'h3',
                    { className: 'boxGroupTit' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u5206\u671F\u5360\u7528\u571F\u5730'
                        )
                    )
                ),
                _react2.default.createElement(
                    'table',
                    { className: 'table builtTable' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u5E8F\u53F7'
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u5730\u5757\u540D\u79F0'
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u5730\u5757\u7F16\u53F7'
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u5168\u90E8\u5F00\u53D1'
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u603B\u7528\u5730\u9762\u79EF\uFF08\u33A1\uFF09'
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u8BA1\u5BB9\u5EFA\u7B51\u9762\u79EF\uFF08\u33A1\uFF09'
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u76F8\u5173\u5206\u671F'
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                '\u64CD\u4F5C'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        th.loadLandHtml(th)
                    )
                )
            );
        }
    }]);

    return StageMasView;
}(_react2.default.Component);

exports.default = StageMasView;

/***/ })

});