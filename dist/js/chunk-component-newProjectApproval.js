webpackJsonp([2],{

/***/ 605:
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

var _componentNewProjectApprovalNode = __webpack_require__(626);

var _componentNewProjectApprovalNode2 = _interopRequireDefault(_componentNewProjectApprovalNode);

var _toolsThreeTree = __webpack_require__(648);

var _toolsThreeTree2 = _interopRequireDefault(_toolsThreeTree);

var _toolsDynamicTable = __webpack_require__(614);

var _toolsDynamicTable2 = _interopRequireDefault(_toolsDynamicTable);

__webpack_require__(615);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*审批信息*/

/**
 * 首页导航条
 * index  identity  supply  所需
 */
//兼容ie
//审批信息


//专用css

var ApprovalControl = function (_React$Component) {
    _inherits(ApprovalControl, _React$Component);

    function ApprovalControl(arg) {
        _classCallCheck(this, ApprovalControl);

        var _this = _possibleConstructorReturn(this, (ApprovalControl.__proto__ || Object.getPrototypeOf(ApprovalControl)).call(this, arg));

        _this.state = {
            threeId: "tt",
            threeData: [{
                "id": 1,
                "text": "Foods",
                "children": [{
                    "id": 2,
                    "text": "Fruits",
                    "state": "closed",
                    "children": [{
                        "text": "apple",
                        "checked": true
                    }, {
                        "text": "orange"
                    }]
                }, {
                    "id": 3,
                    "text": "Vegetables",
                    "state": "open",
                    "children": [{
                        "text": "tomato",
                        "checked": true
                    }, {
                        "text": "carrot",
                        "checked": true
                    }, {
                        "text": "cabbage"
                    }, {
                        "text": "potato",
                        "checked": true
                    }, {
                        "text": "lettuce"
                    }]
                }]
            }],
            CountData: []

        };
        return _this;
    }

    _createClass(ApprovalControl, [{
        key: 'BIND_COUNT_DATACALLBACK',
        value: function BIND_COUNT_DATACALLBACK() {}
        /*初始化树*/

    }, {
        key: 'initTree',
        value: function initTree(da) {
            console.log(da);
            //let th=this;

        }
    }, {
        key: 'render',
        value: function render() {
            var th = this;
            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    'chengwei'
                ),
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'h3',
                        { className: 'boxGroupTit' },
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u9879\u76EE\u4FE1\u606F'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_toolsDynamicTable2.default, { pid: 'countdata', DynamicData: this.state.CountData, CallBack: this.BIND_COUNT_DATACALLBACK.bind(this) })
                    )
                ),
                _react2.default.createElement(_toolsThreeTree2.default, { url: '', callback: th.initTree.bind(this), id: th.state.threeId }),
                _react2.default.createElement(_componentNewProjectApprovalNode2.default, { pid: iss.id })
            );
        }
    }]);

    return ApprovalControl;
}(_react2.default.Component);

exports.default = ApprovalControl;

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

/***/ 614:
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
            iss.calendar(de, function (arg) {
                el.val = arg;
                th.props.CallBack.call(th, el);
            });
        }
    }, {
        key: "EVENT_CHANGE_INPUT",
        value: function EVENT_CHANGE_INPUT(da, ev) {
            //input修改
            var th = this;
            if (th.Bind_checked(da, ev.target.value)) {
                th.props.CallBack(da, ev);
            }
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
                return regs.test(val);
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
                        { name: el.id, onChange: _this2.props.CallBack.bind(_this2, el), value: el.val || "" },
                        list
                    );
                } else if (el.type == "date") {
                    return _react2.default.createElement("input", { name: el.id, className: "esayuiDate", id: el.id, "data-pid": el.pid, value: el.val || "", placeholder: el.edit.indexOf("+m") >= 0 ? "" : "", type: "text", onClick: _this2.setEventDate.bind(_this2, el), readOnly: "true" });
                } else {

                    return _react2.default.createElement("input", { name: el.id, id: el.id, "data-pid": el.pid, value: el.val || "", placeholder: el.edit.indexOf("+m") >= 0 ? "" : "", type: "text", onChange: _this2.EVENT_CHANGE_INPUT.bind(_this2, el), readOnly: el.edit.indexOf("+r") >= 0 });
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

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(616);
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

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(606)(undefined);
// imports


// module
exports.push([module.i, ".tools-dynamicTable {\n  margin-top: 10px;\n}\n.tools-dynamicTable ul li {\n  height: 40px;\n  overflow: hidden;\n}\n.tools-dynamicTable ul li label {\n  font-size: 12px;\n  color: #333;\n  font-weight: normal;\n  width: 110px;\n  text-align: right;\n  padding-top: 5px;\n  float: left;\n}\n.tools-dynamicTable ul li div {\n  display: block;\n  margin: 0 65px 0 115px;\n}\n.tools-dynamicTable ul li div input {\n  width: 100%;\n  padding: 3px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li div input[readonly] {\n  background: #fbfbfb;\n}\n.tools-dynamicTable ul li div select {\n  width: 100%;\n  height: 25px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li i {\n  font-style: normal;\n  width: 60px;\n  float: right;\n  padding-top: 3px;\n}\n.tools-dynamicTable ul li i.date {\n  display: inline-block;\n  height: 30px;\n  background: url(" + __webpack_require__(617) + ") no-repeat 3px 50%;\n}\n.BIND_LAND_BTN {\n  padding: 10px;\n}\n.BIND_LAND_BTN li {\n  display: inline-block;\n  padding: 5px 10px;\n  border: #ddd solid 1px;\n  cursor: pointer;\n  margin: 10px;\n  position: relative;\n  top: 0;\n  left: 0;\n}\n.BIND_LAND_BTN li.active {\n  background: #e4e4e4;\n}\n.BIND_LAND_BTN li .icon-delete {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n  display: none;\n}\n.BIND_LAND_BTN li:hover .icon-delete {\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 617:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 626:
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

__webpack_require__(627);

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
            DataKev: _this.props.guid, //表单guid
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

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(628);
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

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(606)(undefined);
// imports


// module
exports.push([module.i, "h1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: lighter;\n}\ntextarea,\ntextarea:hover {\n  outline: none;\n}\n.boxGroupDetail {\n  padding: 0 0px;\n  font-size: 1rem;\n}\n.boxGroupDetail .textareaText {\n  width: 100%;\n  height: 80px;\n  padding: 10px;\n  resize: none;\n  border: 1px solid #dddddd;\n}\n.boxGroupDetail .boxGroupTitBig {\n  height: 40px;\n  line-height: 40px;\n  background: #0b4082;\n  color: #ffffff ;\n  padding: 0 20px 0 40px;\n  background-image: url(" + __webpack_require__(629) + ");\n  background-repeat: no-repeat;\n  background-position: 15px;\n}\n.boxGroupDetail .formTable2 tr td {\n  width: 202px;\n}\n.boxGroupDetail .formTable2 tr td:nth-of-type(1) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable2 tr td:nth-of-type(3) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable2 tr td:nth-of-type(5) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable1 tr td {\n  width: 202px;\n}\n.boxGroupDetail .formTable1 tr td:nth-of-type(1) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable1 tr td:nth-of-type(3) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable1 tr td:nth-of-type(5) {\n  background: #f5f5f5;\n  width: 160px;\n}\n.boxGroupDetail .formTable3 tr:nth-of-type(1) th {\n  background: #f5f5f5;\n  text-align: center;\n}\n.boxGroupDetail .formTable3 tr td:nth-of-type(1) {\n  background: #f5f5f5;\n  text-align: right;\n}\n.boxGroupDetail .formTable3 tr td .inputTextBox {\n  width: 100%;\n}\n.boxGroupDetail .formTableLabel {\n  width: 100%;\n  text-align: right;\n}\n.boxGroupDetail table > tbody > tr > td,\n.boxGroupDetail .table > tbody > tr > th,\n.boxGroupDetail .table > tfoot > tr > td,\n.boxGroupDetail .table > tfoot > tr > th,\n.boxGroupDetail .table > thead > tr > td,\n.boxGroupDetail .table > thead > tr > th {\n  padding: 2px !important;\n  border: 1px solid #dddddd;\n}\n.boxGroupDetail .tableProject {\n  margin-top: 20px;\n}\n.boxGroupDetail .btnBox {\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n}\n.boxGroupDetail .btnBox a {\n  display: inline-block;\n  padding: 0 12px;\n  height: 26px;\n  line-height: 26px;\n  background: #0b4082;\n  color: #ffffff ;\n  margin: 0 10px;\n}\n.boxGroupDetail .btnBox a:hover {\n  background: #f1a118;\n}\n.boxGroupDetail .approvalProcess tr th {\n  text-align: center;\n  background: #f5f5f5;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(1) {\n  width: 150px;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(3) {\n  width: 150px;\n  text-align: center;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(4) {\n  width: 150px;\n  text-align: center;\n}\n.boxGroupDetail .approvalProcess tr td:nth-of-type(5) {\n  width: 150px;\n  text-align: center;\n}\n.ApplyFlow li {\n  display: inline-block;\n  margin: 0 3px;\n  cursor: pointer;\n}\n.ApplyFlow li::after {\n  display: inline-block;\n  content: \"->\";\n  margin-left: 3px;\n}\n.ApplyFlow li:last-child::after {\n  display: none;\n}\n.ApplyFlow li label {\n  font-weight: normal;\n}\n", ""]);

// exports


/***/ }),

/***/ 629:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuUlEQVQ4T+2TXQ3CQBCE53MADnAADkBCJVQCEooDJFQCEiqhOKiEOhiyTSFtc3AlvLLJPd3Otz83h34MpnrbzRe8HiheANtnSUdJ1wzkDvRRDDgNANutpDhdRryRVEg6SLpNAQPNdhW8JQS42C6BesyJUasU4JTqAGhsH4D2HaAfR1izw52kMtnBGvXHEf4Akk+43Mu4xL2k7cyJQLgrG7bD6h0wWP5p5VpSUMMPuYjKr2Kz35hTpu4fyuOCEY3r4pUAAAAASUVORK5CYII="

/***/ }),

/***/ 648:
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*复选框==树结构*/


//兼容ie

var ThreeTree = function (_React$Component) {
    _inherits(ThreeTree, _React$Component);

    function ThreeTree(arg) {
        _classCallCheck(this, ThreeTree);

        var _this = _possibleConstructorReturn(this, (ThreeTree.__proto__ || Object.getPrototypeOf(ThreeTree)).call(this, arg));

        _this.state = {
            threeData: []

        };
        return _this;
    }

    _createClass(ThreeTree, [{
        key: "getAjax",
        value: function getAjax() {
            this.bindTree(this.state.threeData);
        }
    }, {
        key: "bindTree",
        value: function bindTree(da) {
            var th = this;
            //  console.log(th.props.id);
            $("#" + th.props.id).tree({
                data: da,
                checkbox: true
            });
            this.props.callback(da);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var th = this;
            this.getAjax();
            //th.props.eveInitLoad();
        }
    }, {
        key: "render",
        value: function render() {

            return _react2.default.createElement("ul", { id: this.props.id });
        }
    }]);

    return ThreeTree;
}(_react2.default.Component);

exports.default = ThreeTree;

/***/ })

});