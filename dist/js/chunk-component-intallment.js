webpackJsonp([0],{

/***/ 592:
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

var _componentStagingInformation = __webpack_require__(650);

var _componentStagingInformation2 = _interopRequireDefault(_componentStagingInformation);

var _componentIndicators = __webpack_require__(651);

var _componentIndicators2 = _interopRequireDefault(_componentIndicators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*分期  */
//兼容ie


var Intallment = function (_React$Component) {
    _inherits(Intallment, _React$Component);

    function Intallment(arg) {
        _classCallCheck(this, Intallment);

        var _this = _possibleConstructorReturn(this, (Intallment.__proto__ || Object.getPrototypeOf(Intallment)).call(this, arg));

        _this.state = {
            StagingInformationDATA: {}, /*分期信息*/
            landList: [], /*分期占用土地*/
            equityRatio: "", /*权益比例*/
            status: "show",
            STAGEVERSIONID_guid: iss.guid(),
            STAGEID_guid: iss.guid(),
            ID_guid: iss.guid(),
            landCode: "", /*地块编码*/
            projectCode: "", /*项目编码*/
            maxCode: "", /*最大编码*/
            pCodeAndLXCode: "" /*分期编码*/
        };
        iss.hashHistory.listen(function (local, next) {});
        return _this;
    }

    _createClass(Intallment, [{
        key: "componentWillMount",
        value: function componentWillMount() {

            var location = this.props.location;
            if (location.query["status"]) {
                this.setState({
                    status: this.props.location.query.status
                });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "BIND_StagingInformationDATA",
        value: function BIND_StagingInformationDATA(data) {
            console.log(data);
            this.setState({
                StagingInformationDATA: data
            }, function () {
                //   this.getAjax();
            });
        }
        /*分期占用土地==数据*/

    }, {
        key: "evLandList",
        value: function evLandList(landArr) {

            var th = this;
            var equityTxt = "";
            var landFirstCode = "";
            var landArrLen = landArr.length - 1;
            landArr.forEach(function (obj, index) {
                if (landArrLen == index) {
                    equityTxt = equityTxt + obj.Name + "-" + (obj.EQUITYRATIO || 0) + "%";
                } else {
                    equityTxt = equityTxt + obj.Name + "-" + (obj.EQUITYRATIO || 0) + "%,";
                }

                if (index == 0) {
                    landFirstCode = obj["FieldList"][1]['val'];
                }
            });
            console.log("最终地块信息");
            console.log(landArr);
            console.log("权益比例");
            console.log(equityTxt);

            th.setState({
                landList: landArr,
                equityRatio: equityTxt
            });
            /*只有新增，才会生成code*/
            if (th.state.status == "add") {
                th.setState({
                    landCode: landFirstCode,
                    pCodeAndLXCode: th.state.projectCode + "-" + landFirstCode + "-" + th.state.maxCode
                });
            }
        }
        /*发起审批*/

    }, {
        key: "EVENT_CLICK_POSTAPP",
        value: function EVENT_CLICK_POSTAPP() {
            var status = this.props.location.query.status;
            var th = this;
            var SumbitType;
            var dta = th.state.StagingInformationDATA;

            dta.LandList = th.state.landList;
            if (status == "edit") {
                SumbitType = "Edit";
            } else if (status == "add") {
                SumbitType = "Add";
                dta.STAGEVERSIONID = this.state.STAGEVERSIONID_guid;
                dta.STAGEID = this.state.STAGEID_guid;
                dta.ID = this.state.ID_guid;
                dta.STAGECODE = th.state.pCodeAndLXCode;
            } else if (status == "upgrade") {
                SumbitType = "Upgrade";
                dta.STAGEVERSIONIDOLD = iss.id.id;
                dta.STAGEVERSIONID = this.state.STAGEVERSIONID_guid;
                dta.STAGEID = this.state.STAGEID_guid;
                dta.ID = this.state.ID_guid;
            }
            //    console.log(dta);

            iss.ajax({
                type: "POST",
                url: "/Stage/IToCreate",
                data: {
                    data: JSON.stringify(dta),
                    SumbitType: SumbitType,
                    EditType: "Submit"
                },
                success: function success(data) {
                    console.log(JSON.stringify(data));
                },
                error: function error(er) {
                    console.log('错误');
                }
            });
        }
        /*暂存*/

    }, {
        key: "EVENT_CLICK_SAVE",
        value: function EVENT_CLICK_SAVE() {
            var status = this.props.location.query.status;
            var th = this;
            var SumbitType;
            var dta = th.state.StagingInformationDATA;

            dta.LandList = th.state.landList;
            if (status == "edit") {
                SumbitType = "Edit";
            } else if (status == "add") {
                SumbitType = "Add";
                dta.STAGEVERSIONID = this.state.STAGEVERSIONID_guid;
                dta.STAGEID = this.state.STAGEID_guid;
                dta.ID = this.state.ID_guid;
                dta.STAGECODE = th.state.pCodeAndLXCode;
            } else if (status == "upgrade") {
                SumbitType = "Upgrade";
                dta.STAGEVERSIONIDOLD = iss.id.id;
                dta.STAGEVERSIONID = this.state.STAGEVERSIONID_guid;
                dta.STAGEID = this.state.STAGEID_guid;
                dta.ID = this.state.ID_guid;
            }

            iss.ajax({
                type: "POST",
                url: "/Stage/IToCreate",
                data: {
                    data: JSON.stringify(dta),
                    SumbitType: SumbitType,
                    EditType: "Save"
                },
                success: function success(data) {
                    console.log(JSON.stringify(data));
                    var results = data;
                    if (results.message == "成功") {
                        iss.popover({ content: "保存成功", type: 2 });
                        $(window).trigger("treeLoad");
                    } else {
                        iss.popover({ content: "保存失败" });
                    }
                },
                error: function error(er) {
                    console.log('错误');
                }
            });
        }
    }, {
        key: "getAjax",
        value: function getAjax() {}
        /*获取项目编码和最大编码*/

    }, {
        key: "getPjcodeAMCode",
        value: function getPjcodeAMCode(id) {
            var th = this;
            if (th.state.status != "add") {
                return false;
            }
            iss.ajax({
                type: "post",
                url: "/Stage/IGetStageCodeInfo",
                data: {
                    projectid: id
                },
                success: function success(res) {
                    var result = res.rows;
                    var projectcode = result.projectcode || "";
                    var maxCode = result.MaxCode || "";
                    th.setState({
                        projectCode: projectcode,
                        maxCode: maxCode
                    });
                },
                error: function error(e) {}
            });
        }
    }, {
        key: "render",
        value: function render() {
            var th = this;
            return _react2.default.createElement(
                "article",
                null,
                _react2.default.createElement(
                    "div",
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
                                "\u5206\u671F\u4FE1\u606F"
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
                                { className: "saveIcon", onClick: this.EVENT_CLICK_SAVE.bind(this), href: "javascript:void(0);" },
                                "\u6682\u5B58"
                            ),
                            _react2.default.createElement(
                                "a",
                                { className: "approvalIcon", onClick: this.EVENT_CLICK_POSTAPP.bind(this), href: "#" },
                                "\u53D1\u8D77\u5BA1\u6279"
                            )
                        )
                    )
                ),
                _react2.default.createElement(_componentStagingInformation2.default, { location: this.props.location, pCodeAndLXCode: th.state.pCodeAndLXCode, equityTxt: th.state.equityRatio, codeCallBack: th.getPjcodeAMCode.bind(th), StagingInformationDATA: this.BIND_StagingInformationDATA.bind(this) }),
                _react2.default.createElement(
                    "div",
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
                                "\u5206\u671F\u89C4\u5212\u6761\u4EF6\u6307\u6807"
                            )
                        )
                    )
                ),
                _react2.default.createElement(_componentIndicators2.default, { local: this.props, callback: th.evLandList.bind(th) })
            );
        }
    }]);

    return Intallment;
}(_react2.default.Component);

exports.default = Intallment;

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

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(620);
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

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(609)(undefined);
// imports


// module
exports.push([module.i, ".tools-dynamicTable {\n  margin-top: 10px;\n}\n.tools-dynamicTable ul li {\n  height: 40px;\n  overflow: hidden;\n}\n.tools-dynamicTable ul li label {\n  font-size: 12px;\n  color: #333;\n  font-weight: normal;\n  width: 110px;\n  text-align: right;\n  padding-top: 5px;\n  float: left;\n}\n.tools-dynamicTable ul li div {\n  display: block;\n  margin: 0 65px 0 115px;\n}\n.tools-dynamicTable ul li div input {\n  width: 100%;\n  padding: 3px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li div input[readonly] {\n  background: #fbfbfb;\n}\n.tools-dynamicTable ul li div input.required {\n  background: #fff3f3;\n}\n.tools-dynamicTable ul li div select {\n  width: 100%;\n  height: 25px;\n  border: #ddd solid 1px;\n}\n.tools-dynamicTable ul li i {\n  font-style: normal;\n  width: 60px;\n  float: right;\n  padding-top: 3px;\n}\n.tools-dynamicTable ul li i.date {\n  display: inline-block;\n  height: 30px;\n  background: url(" + __webpack_require__(621) + ") no-repeat 3px 50%;\n}\n.BIND_LAND_BTN {\n  padding: 10px;\n}\n.BIND_LAND_BTN li {\n  display: inline-block;\n  padding: 5px 10px;\n  border: #ddd solid 1px;\n  cursor: pointer;\n  margin: 10px;\n  position: relative;\n  top: 0;\n  left: 0;\n}\n.BIND_LAND_BTN li.active {\n  background: #e4e4e4;\n}\n.BIND_LAND_BTN li .icon-delete {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n  display: none;\n}\n.BIND_LAND_BTN li:hover .icon-delete {\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 621:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACPSURBVHja3JPdDYMwDIS/RFkirBIYgDnoMFmCbcIo/GxBH5pKFnKBUJ44ydLJztm+RDExxhbogQpY+cAIjpIzwAR0Nos95fBA74Q45M5fvoVW904cSAcT1brlT8gGdV7xTDRag6FgcNqzsIrn+sXvuwOn5MwJzkMthILBQW4w5/+QLjhYLPAClgviEejeAwCBmx7bk07M9gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(623);
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

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(609)(undefined);
// imports


// module
exports.push([module.i, ".clear {\n  clear: both;\n}\n.boxGroupTit {\n  height: 40px;\n  margin-bottom: 5px ;\n  position: relative;\n  margin-top: 0;\n}\n.boxGroupTit p {\n  height: 40px;\n  line-height: 40px;\n  color: #333333;\n  font-size: 14px;\n  border-bottom: 1px solid #c9c9c9;\n}\n.boxGroupTit p span {\n  display: inline-block;\n  line-height: 40px;\n  border-bottom: 2px solid #31395d;\n}\n.boxGroupTit p i {\n  font-style: normal;\n}\n.boxGroupTit span.functionButton {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: auto;\n  text-align: right;\n}\n.boxGroupTit span.functionButton a {\n  font-size: 12px;\n  height: 40px;\n  line-height: 40px;\n  display: inline-block;\n  padding-left: 20px;\n  padding-right: 20px;\n  color: #999999 !important;\n  background-repeat: no-repeat;\n  background-position: left center;\n}\n.boxGroupTit span.functionButton a:hover {\n  color: #31395d;\n}\n.boxGroupTit span.functionButton .refresh-icon {\n  background-image: url(" + __webpack_require__(624) + ");\n}\n.boxGroupTit span.functionButton .refresh-icon:hover {\n  background-image: url(" + __webpack_require__(625) + ");\n}\n.boxGroupTit span.functionButton .saveIcon {\n  background-image: url(" + __webpack_require__(626) + ");\n}\n.boxGroupTit span.functionButton .saveIcon:hover {\n  background-image: url(" + __webpack_require__(627) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon {\n  background-image: url(" + __webpack_require__(628) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon:hover {\n  background-image: url(" + __webpack_require__(629) + ");\n}\n.staging-left,\n.staging-right {\n  float: left;\n}\n.projectinFormation {\n  width: 66.6%;\n  height: auto;\n  margin-top: 10px;\n  padding-right: 20px;\n}\n.fieldLocation {\n  margin-top: 10px;\n  width: 33.3%;\n  height: 295px;\n  border: 1px solid #dddddd;\n}\n.carouselStyle .left,\n.carouselStyle .right {\n  background: none;\n}\n.carouselStyle .carousel-control {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  top: 50%;\n  margin-top: -15px;\n  background: #F1A118;\n}\n.carouselStyle .carousel-control:hover {\n  opacity: 0.8;\n}\n", ""]);

// exports


/***/ }),

/***/ 624:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABO0lEQVQ4T6VSsXHDMAwkWLBOJohG8AbRBrE3sBrxWNnZQNlAHUk1zgbWBlEmiD1Bkg3USgWQg45y7Fgn5s4sCeDx/3gQNz6Ymt/tdnd932+IaA0ASehpiagmohdjzNc4dwVQVdWCiN6I6J2ISmNMw838j4gMuEHEzBjzyv8XANbaREr5gYjPY8NfhmEBg6611vUFgPeeC43WupizxlqbSilrpVRyAgjbP5VS91mWtTFvnXMHlngOwKiF1jqNDXPdez+whKDpiYh4MAEANufI+uaAAkA6MAjaH8PAt1JqEZPhnCsBoB0A+O5d1zV8cwBI8zw/xGSwBwBQnDwIUpIY9cB4K4TYaq1/rxDbONa990smjYgrDtlklKfCg4gPQoglAKzGEF0lcYpF2LgnoiMAcHjKc4P/xWBO3s0AP2hInl/EMUEDAAAAAElFTkSuQmCC"

/***/ }),

/***/ 625:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4T6WTgQ0BQRBFnw6ogBJ0QAfogArQAR3ogA7oABWgAnRwJcjb7CbncmcvMcnmkt2ZN//P7nX4MzoN9V1gCcyBQcwpgBOwBV6prg4wBM7AFdgBl5jsvkDBC+DgfhVgtxuwTgk1CgUJFXaqAjxwbTKjGUc7gzLA7k+gB+g3F3ctlgFS7ey3TQSVAvQ0iYWqcDiPKPEXKDRLCvQ9itnvCM3Z8IaKBPDehahAC/rLhTmb8gy0IsDHkosV4Pq6hVxROp8Ce2Cm6qanXIWprg9YbGF4RHUvsU6FRcfSzYTh/foX2loJeW0tNEI/qngqkZ/g9CsAAAAASUVORK5CYII="

/***/ }),

/***/ 626:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHxJREFUeNpinDlzJgM5gAlKewLxMyD+TwA/g6qFa5wLxGFAzAjlM6JhmFgYVC1coyQQH8Hiov9o/CNQtXCNZPsRGTwHYhsk51kD8Qt0RSxYNKYA8WogloDynwJxMjEat8H8QapTyfbjINeIHAX4ADxqWHBEAS4AjxqAAAMASR4bIq9a4swAAAAASUVORK5CYII="

/***/ }),

/***/ 627:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJFJREFUeNpi/P//PwM5gAVEePnleAKpuUAsSUD9cyBO3rZpynYGkI2evtnPgNgGyv4PopExTAykBqQWxGaCmiQJNOUIuvFAl6D4A6oG7ComBjIBNo3PgTbZQG1gBLKtgcwXWAMHDaQA8WqgBgko/ykoQAhqBNqyjYjQpa4fB7lGeBTgA8hRw4IjCnABeNQABBgANs1HTp7NXyoAAAAASUVORK5CYII="

/***/ }),

/***/ 628:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4T6WTzXHCQAyFn/bAcAsdxCW4BHcQSogvaH0jHZAOuBlxASoIqSDuAHcQ0gE5cmCVkcdmjDFkMtnbrqRPTz9L+OehvngRmarqExHFqlqq6muWZUWf7xVARGYAosFgME3T9LBcLuMQwpqIZsy87UIuAKvVanQ8Hgvvfdx2zPM8cs4VzBzdBeR5nhDR2Hs/7TqKiDLzleKLB8tERNsbCkpmHt1VYMbFYrElok9mfrF7Lf8NwIaZ578CrGmq+gFgpKp7IopU9d17P24Bd6q6sVIvSqgn8AxgHkIom2zD4bBsJnI6nWLnXAIgsaaeASKytoBmfF2pbWUhhBRAkWXZvgJY951zNmcjX512MIBvIkomk0mlsALUjVv3Lcq94DNARPZ9S2IOZgPw2M3cyKwU3FqSOvsOwJctWCO7XWMDOAB4aBts62wH7M2adevT9v7Gv/zwH4PhtBGvNQeUAAAAAElFTkSuQmCC"

/***/ }),

/***/ 629:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4T6WTzU3DQBCF3+BF4oY7wCVsDpHsmzsgxyhypNBB6MB0kBIc2ULcCBXg21ri4O2A0EG4RSJk0Do/bJwlCOGbtTPfvJl5Q/jnR658GQ3HYL4GkQSzBnCnq6J0xR4BZJikAAIsxVjrbCG7A0neWcaEVKti1oYcAKQc+XSxKuuqkHagDPsBkShrVQSnAWESg9DTqhi3AzvRkGuVHyk+VGAqQcycCiB0XRX+SQXmUUZD0+erVvlt8x/2A5B4BGiqVT75HdAdSAjvmQCfGXMiBAw8aZX3voHnNcBT02qrhSQlwohBk+36NgWXQu82As+TAMdEiM1Q9wAZJtk2uFlfW6pZp6XsBvgodfUwbwDSTB+U6iqPncayksH8zp/rWL/cG4NhA2gGx5nLKHbldvIe0ImSucskJsC8AXTlSrYAbpM0Nhaemfgbr9a9nWy7zaaFTpgsQHRpPxjXNR4AYIb109E6r/EvF/4FXk6sEdl++K0AAAAASUVORK5CYII="

/***/ }),

/***/ 630:
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*分期信息栏 */


//兼容ie
// import Abc from "xxx.js";

var StagingInformation = function (_React$Component) {
    _inherits(StagingInformation, _React$Component);

    function StagingInformation(arg) {
        _classCallCheck(this, StagingInformation);

        var _this = _possibleConstructorReturn(this, (StagingInformation.__proto__ || Object.getPrototypeOf(StagingInformation)).call(this, arg));

        _this.state = {
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

        _this.tiem = "";
        return _this;
    }
    /*获取分期信息*/


    _createClass(StagingInformation, [{
        key: "getAjax",
        value: function getAjax(callback) {
            var th = this;
            var status = this.props.location.query.status;
            var reqtype;
            var json = {};
            if (status == "edit") {
                json.Id = iss.id.id;
                json.reqtype = "Edit";
            } else if (status == "add") {
                json.projectId = iss.id.id;
                json.reqtype = "Add";
            } else if (status == "upgrade") {
                json.versionId = iss.id.id;
                json.reqtype = "Upgrade";
                $("#GROUPNUMBER").attr("readonly", "readonly");
                $("#GROUPNUMBER").addClass("inputGray");
            }
            iss.ajax({
                type: "post",
                url: "/Stage/IGetInitInfo",
                data: json,
                success: function success(res) {
                    console.log(res.rows);
                    th.setState({
                        "CASENAME": res.rows.BaseFormInfo.CASENAME || "",
                        "STAGENAME": res.rows.BaseFormInfo.STAGENAME,
                        "PROJECTCOMPANYNAME": res.rows.BaseFormInfo.PROJECTCOMPANYNAME,
                        "STAGEID": res.rows.BaseFormInfo.STAGEID,
                        "STAGECREATEDATE": res.rows.BaseFormInfo.STAGECREATEDATE,
                        "STAGEUPDATEDATE": res.rows.BaseFormInfo.STAGEUPDATEDATE,
                        "STARTDATE": res.rows.BaseFormInfo.STARTDATE,
                        "STAGECODE": res.rows.BaseFormInfo.STAGECODE || "",
                        "STATUS": res.rows.BaseFormInfo.STATUS,
                        "ISELFPRODUCTTYPE": res.rows.BaseFormInfo.ISELFPRODUCTTYPE,
                        "TRADERMODE": res.rows.BaseFormInfo.TRADERMODE,
                        "MERGEWAY": res.rows.BaseFormInfo.MERGEWAY,
                        "PROJECTTYPE": res.rows.BaseFormInfo.PROJECTTYPE,
                        "TAXINGWAY": res.rows.BaseFormInfo.TAXINGWAY,
                        "PLANSTAGE": res.rows.BaseFormInfo.PLANSTAGE,
                        "PROJECTID": res.rows.BaseFormInfo.PROJECTID,
                        "PROJECTNAME": res.rows.BaseFormInfo.PROJECTNAME,
                        "ID": res.rows.BaseFormInfo.ID,
                        "PRINCIPALNAME": res.rows.BaseFormInfo.PRINCIPALNAME,
                        "PRINCIPAL": res.rows.BaseFormInfo.PRINCIPAL,
                        "GROUPNUMBER": res.rows.BaseFormInfo.GROUPNUMBER,
                        "STAGEVERSIONID": res.rows.BaseFormInfo.STAGEVERSIONID,
                        "STAGESELFPRODUCTS": res.rows.BaseFormInfo.STAGESELFPRODUCTS

                    }, function (arg) {
                        //console.log(th.state)
                        th.bind_combobox(res);
                        if (callback) {
                            callback();
                        }
                    });

                    th.props.codeCallBack(res.rows.BaseFormInfo.PROJECTID);
                },
                error: function error(e) {}
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var id = iss.id;
            if (id == "1E1CB1E95A864AFA961392C3E3644642" || !id) {
                iss.hashHistory.replace({ pathname: "index" });
            } else {
                this.getAjax(function (arg) {
                    _this2.BIND_ONLOAD();
                    setTimeout(function () {
                        document.getElementById('iframe2').src = $("#iframe2").attr("src");
                    }, 3000);
                });
            }
            //  toolsTab.bindTab(this.props);//绑定头部标签
        }
    }, {
        key: "addTodo",
        value: function addTodo(text) {}
    }, {
        key: "onUpload",
        value: function onUpload() {
            iss.upload({
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                server: 'http://2betop.net/fileupload.php',
                fileNumLimit: 300,
                fileSizeLimit: 5 * 1024 * 1024, // 200 M
                fileSingleSizeLimit: 1 * 1024 * 1024 // 50 M
            });
        }
    }, {
        key: "BIND_CHANGE_DATA",
        value: function BIND_CHANGE_DATA(data) {
            this.props.StagingInformationDATA(data);
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
        }
    }, {
        key: "handChooseTo",
        value: function handChooseTo(da) {
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
                    console.log(da);
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
        key: "handleInputTextChange",
        value: function handleInputTextChange(e) {
            var _this3 = this;

            var th = this;
            var target = e.target.id;
            this.setState(_defineProperty({}, target, e.target.value), function () {
                //console.log(th.state[target]) 
                th.BIND_CHANGE_DATA(_this3.state);
            });

            // console.log(e.target.id);
            //console.log(e.target.value);

        }
    }, {
        key: "handleSelectTextChange",
        value: function handleSelectTextChange(e, b, c) {
            var _this4 = this;

            var th = this;
            this.setState(_defineProperty({}, e, b), function () {
                //console.log(th.state[target]) 
                th.BIND_CHANGE_DATA(_this4.state);
            });
            // console.log(this.state);
        }
    }, {
        key: "bind_combobox",
        value: function bind_combobox(arg) {
            console.log(arg.rows.SelectOptions.STATUS);
            var th = this;
            var installmentState = $("#STATUS"); //分期状态
            installmentState.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "STATUS"),
                data: arg.rows.SelectOptions.STATUS
            });

            if (arg.rows.BaseFormInfo.STATUS == 0 || arg.rows.BaseFormInfo.STATUS == null) {
                installmentState.combobox("select", 0);
            } else {
                installmentState.combobox("select", arg.rows.BaseFormInfo.STATUS);
            }

            var selfSustaining = $("#STAGESELFPRODUCTS"); //自持业态
            selfSustaining.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                multiple: true,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "STAGESELFPRODUCTS"),
                data: arg.rows.SelectOptions.ISELFPRODUCTTYPE,
                onSelect: function onSelect(e) {
                    //console.log(e.val);
                    var val = e.val;
                    if (val == 0) {
                        setTimeout(function (arg) {
                            selfSustaining.combobox("setValues", [0]);
                        });
                    } else if (val != 0) {
                        setTimeout(function (arg) {
                            var STAG_num = th.state.STAGESELFPRODUCTS;
                            var new_arr = [];
                            new_arr = STAG_num.filter(function (obj) {
                                return obj != 0;
                            });
                            selfSustaining.combobox("setValues", new_arr);
                            //selfSustaining.combobox("setValues",[0]);
                        });
                    }
                }
            });
            if (arg.rows.BaseFormInfo.STAGESELFPRODUCTS == 0 || arg.rows.BaseFormInfo.STAGESELFPRODUCTS == null) {
                selfSustaining.combobox("setValues", [0]);
            } else {
                selfSustaining.combobox("setValues", arg.rows.BaseFormInfo.STAGESELFPRODUCTS);
            }
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
            if (arg.rows.BaseFormInfo.TRADERMODE == 0 || arg.rows.BaseFormInfo.TRADERMODE == null) {
                tradersWay.combobox("select", "");
            } else {
                tradersWay.combobox("select", arg.rows.BaseFormInfo.TRADERMODE);
            }

            var tableManner = $("#MERGEWAY"); //并表方式
            tableManner.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "MERGEWAY"),
                data: arg.rows.SelectOptions.MERGEWAY
            });
            if (arg.rows.BaseFormInfo.MERGEWAY == 0 || arg.rows.BaseFormInfo.MERGEWAY == null) {
                tableManner.combobox("select", "");
            } else {
                tableManner.combobox("select", arg.rows.BaseFormInfo.MERGEWAY);
            }

            var projectType = $("#PROJECTTYPE"); //项目类型
            projectType.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "PROJECTTYPE"),
                data: arg.rows.SelectOptions.PROJECTTYPE
            });
            if (arg.rows.BaseFormInfo.PROJECTTYPE == 0 || arg.rows.BaseFormInfo.PROJECTTYPE == null) {
                projectType.combobox("select", "");
            } else {
                projectType.combobox("select", arg.rows.BaseFormInfo.PROJECTTYPE);
            }

            var taxManner = $("#TAXINGWAY"); //项目计税方式
            taxManner.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "TAXINGWAY"),
                data: arg.rows.SelectOptions.TAXINGWAY
            });
            if (arg.rows.BaseFormInfo.TAXINGWAY == 0 || arg.rows.BaseFormInfo.TAXINGWAY == null) {
                taxManner.combobox("select", "");
            } else {
                taxManner.combobox("select", arg.rows.BaseFormInfo.TAXINGWAY);
            }

            var controlStage = $("#PLANSTAGE"); //计划管控阶段
            controlStage.combobox({
                valueField: "val",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                onChange: th.handleSelectTextChange.bind(th, "PLANSTAGE"),
                data: arg.rows.SelectOptions.PLANSTAGE
            });
            if (arg.rows.BaseFormInfo.PLANSTAGE == 0 || arg.rows.BaseFormInfo.PLANSTAGE == null) {
                controlStage.combobox("select", "");
            } else {
                controlStage.combobox("select", arg.rows.BaseFormInfo.PLANSTAGE);
            }
        }
    }, {
        key: "BIND_CHECKPROJECTNAME",
        value: function BIND_CHECKPROJECTNAME(ev) {
            //检查姓名名称是否冲突
            var th = this;
            var projectid = iss.id.id;
            var name = ev.target.value;
            this.setState({
                STAGENAME: name
            });
            clearTimeout(this.time);
            this.time = setTimeout(function (arg) {
                iss.ajax({
                    type: "POST",
                    url: "/Stage/ICheckStageName",
                    data: {
                        projectid: projectid,
                        name: name
                    },
                    success: function success(data) {
                        if (data["rows"] == true) {
                            th.BIND_CHANGE_DATA(th.state);
                        } else {
                            alert("错误");
                        }
                    },
                    error: function error(er) {
                        console.log('错误');
                    }
                });
            }, 500);
        }
    }, {
        key: "xmViewError",
        value: function xmViewError(event) {
            // this.attr("src","../img/xmViewError.png")
            $(event.target).attr("src", "../../Content/img/xmViewError.png");
        }
    }, {
        key: "BIND_EditStage",
        value: function BIND_EditStage() {
            window.open(this.state.mapUrl + "/Admin/EditStage?stage_id=" + this.state.STAGEVERSIONID + "&stage_map_id=stage" + this.state.STAGEVERSIONID);
        }
    }, {
        key: "BIND_EditPushPlate",
        value: function BIND_EditPushPlate() {
            window.open(this.state.mapUrl + "/Admin/EditPushPlate?stage_id=" + this.state.STAGEVERSIONID + "&stage_map_id=stage" + this.state.STAGEVERSIONID);
        }
    }, {
        key: "BIND_mapsStage",
        value: function BIND_mapsStage() {
            window.open(this.state.mapUrl + "/Map/Stage?stage_id=" + this.state.STAGEVERSIONID + "&stage_map_id=stage" + this.state.STAGEVERSIONID);
        } //点击分期总图预览

    }, {
        key: "BIND_mapsTp",
        value: function BIND_mapsTp() {
            window.open(this.state.mapUrl + "/Map/PUSHPLATE?stage_id=" + this.state.STAGEVERSIONID + "&stage_map_id=stage" + this.state.STAGEVERSIONID);
        } //点击推盘图预览

    }, {
        key: "render",
        value: function render() {
            var th = this;
            var STAGECREATEDATE = th.state.STAGECREATEDATE == "1900-01-01T00:00:00" ? "" : this.state.STAGECREATEDATE.split("T")[0];
            var STAGEUPDATEDATE = th.state.STAGEUPDATEDATE == "1900-01-01T00:00:00" ? "" : this.state.STAGEUPDATEDATE.split("T")[0];
            var STARTDATE = th.state.STARTDATE == "1900-01-01T00:00:00" ? "" : this.state.STARTDATE.split("T")[0];
            return _react2.default.createElement(
                "article",
                { className: "staging-box" },
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
                                        "\u9879\u76EE\u540D\u79F0"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", id: "PROJECTNAME", value: this.state.PROJECTNAME || "", className: "inputTextBox inputGray boxSizing", type: "text" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u5206\u671F\u540D\u79F0"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { onChange: this.BIND_CHECKPROJECTNAME.bind(this), id: "STAGENAME", value: this.state.STAGENAME || "", className: "inputTextBox boxSizing", type: "text" })
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
                                        "\u5206\u671F\u6848\u540D"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { onChange: this.handleInputTextChange.bind(this), id: "CASENAME", value: this.state.CASENAME || "", className: "inputTextBox boxSizing", type: "text" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5206\u671F\u7F16\u7801"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", id: "STAGECODE", value: th.props.pCodeAndLXCode || th.state.STAGECODE, className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                        "\u5206\u671F\u72B6\u6001"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "STATUS" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u81EA\u6301\u4E1A\u6001"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "STAGESELFPRODUCTS" })
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
                                        "\u9879\u76EE\u516C\u53F8\u540D\u79F0"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { onChange: this.handleInputTextChange.bind(this), id: "PROJECTCOMPANYNAME", value: this.state.PROJECTCOMPANYNAME || "", className: "inputTextBox boxSizing", type: "text" })
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
                                        { className: "formTableLabel boxSizing" },
                                        "\u6743\u76CA\u6BD4\u4F8B"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", id: "equityTxt", value: this.props.equityTxt, className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                        "\u5E76\u8868\u65B9\u5F0F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "MERGEWAY" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u9879\u76EE\u7C7B\u578B"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "PROJECTTYPE" })
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
                                        "\u9879\u76EE\u8BA1\u7A0E\u65B9\u5F0F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "TAXINGWAY" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5206\u671F\u521B\u5EFA\u65E5\u671F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", id: "STAGECREATEDATE", value: STAGECREATEDATE, className: "inputTextBox inputGray boxSizing", type: "text" })
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
                                        "\u5206\u671F\u66F4\u65B0\u65E5\u671F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", id: "STAGEUPDATEDATE", value: STAGEUPDATEDATE, className: "inputTextBox inputGray boxSizing", type: "text" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u8BA1\u5212\u7BA1\u63A7\u9636\u6BB5"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "PLANSTAGE" })
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
                                        "\u542F\u52A8\u5F00\u53D1\u65F6\u95F4"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", id: "STARTDATE", value: STARTDATE, className: "inputTextBox inputGray boxSizing", type: "text" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u5206\u671F\u603B\u56FE"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { onClick: this.BIND_EditStage.bind(this), className: "btn btnStyle uploadIconBtn" },
                                        "\u4E0A\u4F20/\u7F16\u8F91\u5206\u671F\u603B\u56FE"
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
                                        "\u7EC4\u56E2\u6570\u91CF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { onChange: this.handleInputTextChange.bind(this), id: "GROUPNUMBER", value: this.state.GROUPNUMBER || "", className: "inputTextBox boxSizing", type: "text" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u63A8\u76D8\u56FE"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { onClick: this.BIND_EditPushPlate.bind(this), className: "btn btnStyle uploadIconBtn" },
                                        "\u4E0A\u4F20/\u7F16\u8F91\u63A8\u76D8\u56FE"
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
                _react2.default.createElement("div", { className: "clear" })
            );
        }
    }]);

    return StagingInformation;
}(_react2.default.Component);

exports.default = StagingInformation;

/***/ }),

/***/ 651:
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

__webpack_require__(630);

var _toolsDynamicTable = __webpack_require__(616);

var _toolsDynamicTable2 = _interopRequireDefault(_toolsDynamicTable);

__webpack_require__(619);

__webpack_require__(631);

var _componentIndicatorsWinopen = __webpack_require__(633);

var _componentIndicatorsWinopen2 = _interopRequireDefault(_componentIndicatorsWinopen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 分期经济指标（投决会版）
//兼容ie


__webpack_require__(622); //专用css
/*表格*/

//弹出选择地块
var Indicators = function (_React$Component) {
    _inherits(Indicators, _React$Component);

    function Indicators(arg) {
        _classCallCheck(this, Indicators);

        var _this = _possibleConstructorReturn(this, (Indicators.__proto__ || Object.getPrototypeOf(Indicators)).call(this, arg));

        _this.state = {
            newDynamicData: {}, //空数据
            DynamicData: {}, //已存在数据
            propsDATA: [], //显示数据
            pid: "",
            treeId: iss.id.id, //左侧树id
            states: false,
            AcountData: [], /*分期规划条件指标-汇总数据*/
            winAllBuiltData: [], /*分期占用土地table*/
            winopenDATA: [], /*alert中选择地块信息(这个里面不包括已经选择过的地块)或者编辑选中的地块*/
            winopenSelId: "", /*alert中保存选择过的地块Id,逗号分隔*/
            landStageArr: {} /*分期占用土地=相关分期*/
        };
        return _this;
    }

    /*编辑分期，初次获取分期占用土地数据，并汇总数据*/


    _createClass(Indicators, [{
        key: 'evGetLandData',
        value: function evGetLandData() {
            var th = this;
            var status = th.props.local.location.query.status;
            var allListArr = [];
            var selIDs = [];
            /*新建分期则不用请求*/
            if (status != "add") {
                iss.ajax({
                    url: "/Stage/IGetLandQuotaByVersionId",
                    type: "get",
                    data: {
                        versionId: iss.id.id,
                        projectid: iss.id.parentid
                    },
                    success: function success(d) {
                        console.log("第一次加载，编辑分期时，获取分期占用土地数据");
                        console.log(d.rows);
                        allListArr = d.rows;
                        allListArr.forEach(function (obj, index) {
                            selIDs.push(obj.ID);
                        });
                        th.setState({
                            winopenSelId: selIDs.join(","),
                            winAllBuiltData: allListArr,
                            winopenDATA: []
                        });
                        th.evGetLandFieldSum(allListArr);
                        th.props.callback(allListArr);
                    },
                    error: function error(d) {
                        console.log(JSON.stringify(d));
                    }
                });
            }
        }

        /*分期占用土地=获取相关分期*/

    }, {
        key: 'evIGetLandStageShow',
        value: function evIGetLandStageShow() {
            var th = this;
            var status = th.props.local.location.query.status;
            var id = status == "add" ? iss.id.id : iss.id.parentid;
            iss.ajax({
                url: "/Stage/IGetLandStageShow",
                type: "get",
                data: {
                    projectid: id
                },
                success: function success(d) {
                    th.setState({
                        landStageArr: d.rows
                    });
                },
                error: function error(d) {
                    console.log(JSON.stringify(d));
                }
            });
        }
        /*编辑：初次汇总分期规划条件指标*/

    }, {
        key: 'evGetLandFieldSum',
        value: function evGetLandFieldSum(listArrs) {
            var th = this;
            th.ev_saveBuiltInfor("del", listArrs);
        }

        /*编辑地块事件*/

    }, {
        key: 'evBuiltEditTr',
        value: function evBuiltEditTr(selObj, event) {
            var th = this;
            var selArr = [];
            selArr.push(selObj);
            th.BIND_WINOPEN(selArr);
            th.EVENT_SELECTMISSIF('edit', selArr);
        }
        /*删除地块*/

    }, {
        key: 'evBuiltDelTr',
        value: function evBuiltDelTr(selObj, event) {
            var th = this;
            var id = selObj.ID;
            var selAllArrs = th.state.winAllBuiltData;
            iss.Alert({
                title: "提示",
                width: 300,
                content: '<div class="Alert">\u662F\u5426\u5220\u9664\u5730\u5757</div>',
                ok: function ok() {

                    var newSelAllArrs = selAllArrs.filter(function (obj, index) {
                        return obj.ID != id;
                    });
                    th.ev_saveBuiltInfor("del", newSelAllArrs);
                },
                cancel: function cancel() {}
            });
        }
        /*分期占用土地=渲染table*/

    }, {
        key: 'BIND_CreateTable',
        value: function BIND_CreateTable() {
            var th = this;
            var list = th.state.winAllBuiltData;
            var landStageArr = th.state.landStageArr;

            return list.map(function (obj, index) {
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
                        landStageArr[obj.ID]
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'funCla funCla_edit', onClick: th.evBuiltEditTr.bind(th, obj) },
                            '\u7F16\u8F91'
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'funCla funCla_del', onClick: th.evBuiltDelTr.bind(th, obj) },
                            '\u5220\u9664'
                        )
                    )
                );
            });
        }
    }, {
        key: 'BIND_CALLBACK',
        value: function BIND_CALLBACK() {}
        /*alert==实时获取地块的信息*/

    }, {
        key: 'BIND_WINOPEN',
        value: function BIND_WINOPEN(da) {
            console.log("实时地块信息");
            console.log(da);
            this.setState({
                winopenDATA: da
            });
        }
        /*根据地块变化=汇总数据
        @param operaStatus判断是编辑地块,选择地块,删除地块
        */

    }, {
        key: 'ev_saveBuiltInfor',
        value: function ev_saveBuiltInfor(operaStatus, newArr) {
            var th = this;
            var listArr = th.state.winopenDATA;
            var filterListArr = []; /*如果是选择地块：过滤选择过的地块；*/
            var allListArr = th.state.winAllBuiltData;

            if (operaStatus == "edit") {
                allListArr.forEach(function (obj, index) {
                    if (obj.ID == listArr[0]["ID"]) {
                        obj = listArr[0];
                    }
                });
            } else if (operaStatus == "del") {
                allListArr = newArr;
            } else if (operaStatus == "select") {
                listArr.forEach(function (obj, index) {
                    if (obj.IsAllDevel != 0) {
                        filterListArr.push(obj);
                    }
                });
            }

            allListArr = allListArr.concat(filterListArr);

            var selIDs = []; /*保存选择过的地块id*/
            iss.ajax({
                url: "/Stage/IRetLandDynaticFieldSum",
                type: "post",
                data: {
                    data: JSON.stringify(allListArr)
                },
                success: function success(d) {
                    /*存储选择过的地块*/
                    allListArr.forEach(function (obj, index) {
                        selIDs.push(obj.ID);
                    });
                    th.setState({
                        winopenSelId: selIDs.join(","),
                        winAllBuiltData: allListArr,
                        winopenDATA: [],
                        AcountData: d.rows
                    });
                    th.props.callback(allListArr);

                    console.log("分期规划条件指标/汇总数据=========");
                    console.log(d.rows);
                },
                error: function error(d) {
                    console.log(JSON.stringif(d));
                }
            });
        }
        /*选择地块事件
        @editOrSel 判断是编辑(edit)/选择(select) 地块
        */

    }, {
        key: 'EVENT_SELECTMISSIF',
        value: function EVENT_SELECTMISSIF(editOrSel, selArr) {
            var th = this;
            var status = th.props.local.location.query.status;
            var id = "";
            var title = "";
            /*判断分期是新增还是编辑或升级*/
            if (status == "add") {
                id = th.state.treeId;
            } else {
                id = iss.id.parentid;
            }
            /*判断是编辑地块还是选择地块*/
            if (editOrSel == "select") {
                title = "选择分期占用土地<span class='red'>（*为必填项）</span>";
            } else if (editOrSel == "edit") {
                title = "编辑分期占用土地<span class='red'>（*为必填项）</span>";
            }
            iss.Alert({
                title: title,
                width: 1000,
                height: 400,
                content: '<div id="alertBuiltBlock"></div>',
                ok: function ok() {
                    var isValid = $("#form_aBuiltLand").form("validate");
                    console.log("验证结果：" + isValid);
                    if (isValid) {
                        th.ev_saveBuiltInfor(editOrSel);
                    } else {
                        return false;
                    }
                }
            });

            _reactDom2.default.render(_react2.default.createElement(_componentIndicatorsWinopen2.default, { guid: id, selId: th.state.winopenSelId, selArr: selArr, status: editOrSel, callback: this.BIND_WINOPEN.bind(this) }), document.querySelector("#alertBuiltBlock"));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (iss.id == "") {
                return;
            }
            this.evGetLandData(); /*编辑分期时，初次获取分期占用土地数据*/
            this.evIGetLandStageShow(); /*分期占用土地=获取相关分期*/
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            // if (!this.props.local.location || !this.props.local.location.state) { 
            //     iss.Alert({ content: "请选择区域或项目！" }) 
            // } else {
            //     this.setState({
            //         treeId: this.props.local.location.state.id
            //     })
            // }
        }
    }, {
        key: 'render',
        value: function render() {
            var selArr = [];
            return _react2.default.createElement(
                'article',
                { className: 'staging-box' },
                _react2.default.createElement(
                    'section',
                    { className: 'boxSizing' },
                    _react2.default.createElement(_toolsDynamicTable2.default, { pid: iss.guid(), DynamicData: this.state.AcountData, CallBack: this.BIND_CALLBACK.bind(this) })
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
                                '\u5206\u671F\u5360\u7528\u571F\u5730'
                            ),
                            _react2.default.createElement('i', null)
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'functionButton' },
                            _react2.default.createElement(
                                'a',
                                { className: 'refresh-icon addIcon ClickThePopUp1', onClick: this.EVENT_SELECTMISSIF.bind(this, 'select', selArr), href: 'javascript:;' },
                                '\u9009\u62E9\u5730\u5757'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
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
                                this.BIND_CreateTable(this)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Indicators;
}(_react2.default.Component);

exports.default = Indicators;

/***/ })

});