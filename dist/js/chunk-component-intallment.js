webpackJsonp([1],{

/***/ 1278:
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

/***/ 1279:
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

var	fixUrls = __webpack_require__(1280);

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

/***/ 1280:
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

/***/ 580:
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

var _componentStagingInformation = __webpack_require__(600);

var _componentStagingInformation2 = _interopRequireDefault(_componentStagingInformation);

var _componentIndicators = __webpack_require__(601);

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

        iss.hashHistory.listen(function (local, next) {});
        return _this;
    }

    _createClass(Intallment, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "article",
                null,
                _react2.default.createElement(_componentStagingInformation2.default, null),
                _react2.default.createElement(_componentIndicators2.default, null)
            );
        }
    }]);

    return Intallment;
}(_react2.default.Component);

exports.default = Intallment;

/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(587);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1279)(content, options);
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

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1278)(undefined);
// imports


// module
exports.push([module.i, ".clear {\n  clear: both;\n}\n.boxGroupTit {\n  height: 40px;\n  margin-bottom: 5px ;\n  position: relative;\n  margin-top: 0;\n}\n.boxGroupTit p {\n  height: 40px;\n  line-height: 40px;\n  color: #333333;\n  font-size: 14px;\n  border-bottom: 1px solid #c9c9c9;\n}\n.boxGroupTit p span {\n  display: inline-block;\n  line-height: 40px;\n  border-bottom: 2px solid #31395d;\n}\n.boxGroupTit p i {\n  font-style: normal;\n}\n.boxGroupTit span.functionButton {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: auto;\n  text-align: right;\n}\n.boxGroupTit span.functionButton a {\n  font-size: 12px;\n  height: 40px;\n  line-height: 40px;\n  display: inline-block;\n  padding-left: 20px;\n  padding-right: 20px;\n  color: #999999 !important;\n  background-repeat: no-repeat;\n  background-position: left center;\n}\n.boxGroupTit span.functionButton a:hover {\n  color: #31395d;\n}\n.boxGroupTit span.functionButton .refresh-icon {\n  background-image: url(" + __webpack_require__(588) + ");\n}\n.boxGroupTit span.functionButton .refresh-icon:hover {\n  background-image: url(" + __webpack_require__(589) + ");\n}\n.boxGroupTit span.functionButton .saveIcon {\n  background-image: url(" + __webpack_require__(590) + ");\n}\n.boxGroupTit span.functionButton .saveIcon:hover {\n  background-image: url(" + __webpack_require__(591) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon {\n  background-image: url(" + __webpack_require__(592) + ");\n}\n.boxGroupTit span.functionButton .approvalIcon:hover {\n  background-image: url(" + __webpack_require__(593) + ");\n}\n.staging-left,\n.staging-right {\n  float: left;\n}\n.projectinFormation {\n  width: 66.6%;\n  height: auto;\n  margin-top: 10px;\n  padding-right: 20px;\n}\n.fieldLocation {\n  margin-top: 10px;\n  width: 33.3%;\n  height: 295px;\n  border: 1px solid #dddddd;\n}\n.carouselStyle .left,\n.carouselStyle .right {\n  background: none;\n}\n.carouselStyle .carousel-control {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  top: 50%;\n  margin-top: -15px;\n  background: #F1A118;\n}\n.carouselStyle .carousel-control:hover {\n  opacity: 0.8;\n}\n", ""]);

// exports


/***/ }),

/***/ 588:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABO0lEQVQ4T6VSsXHDMAwkWLBOJohG8AbRBrE3sBrxWNnZQNlAHUk1zgbWBlEmiD1Bkg3USgWQg45y7Fgn5s4sCeDx/3gQNz6Ymt/tdnd932+IaA0ASehpiagmohdjzNc4dwVQVdWCiN6I6J2ISmNMw838j4gMuEHEzBjzyv8XANbaREr5gYjPY8NfhmEBg6611vUFgPeeC43WupizxlqbSilrpVRyAgjbP5VS91mWtTFvnXMHlngOwKiF1jqNDXPdez+whKDpiYh4MAEANufI+uaAAkA6MAjaH8PAt1JqEZPhnCsBoB0A+O5d1zV8cwBI8zw/xGSwBwBQnDwIUpIY9cB4K4TYaq1/rxDbONa990smjYgrDtlklKfCg4gPQoglAKzGEF0lcYpF2LgnoiMAcHjKc4P/xWBO3s0AP2hInl/EMUEDAAAAAElFTkSuQmCC"

/***/ }),

/***/ 589:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4T6WTgQ0BQRBFnw6ogBJ0QAfogArQAR3ogA7oABWgAnRwJcjb7CbncmcvMcnmkt2ZN//P7nX4MzoN9V1gCcyBQcwpgBOwBV6prg4wBM7AFdgBl5jsvkDBC+DgfhVgtxuwTgk1CgUJFXaqAjxwbTKjGUc7gzLA7k+gB+g3F3ctlgFS7ey3TQSVAvQ0iYWqcDiPKPEXKDRLCvQ9itnvCM3Z8IaKBPDehahAC/rLhTmb8gy0IsDHkosV4Pq6hVxROp8Ce2Cm6qanXIWprg9YbGF4RHUvsU6FRcfSzYTh/foX2loJeW0tNEI/qngqkZ/g9CsAAAAASUVORK5CYII="

/***/ }),

/***/ 590:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+ElEQVQ4T92TMY6DQAxFxyMx7XKE3GBzg+QoocGaLkfgCHTINHAU9ga7N8gRSOvCXnmUWa0iEEmTIi5Ag/0fxnyDu0Xf93vn3Ec+b9yvdV1/Ww3YhYjOqnoCgPkmnFYAR3uuqqWqtjHGMQPmEMKOmc9WgIjNf4B1VxTFJedDCC0zXxCxzABFRCCiJLwHENEkIo33PnVgeSJKmpcBGhEZvfenrQ5sBgcAaJeGqKqW/0LEdvEThmEomdneUq78BRv2WFXVvAh40AOp7A0Bs7nqyRkkTTaSOfDTOZcW5IGwxfsxRyaARdd1x2zVLYCITDHGtHB/gC3RWv4XGt+9Eawr3zcAAAAASUVORK5CYII="

/***/ }),

/***/ 591:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABC0lEQVQ4T92TQUrEQBBFfzFBxpU5gjewXQjJyjnHkECOkCN4hBwhkOA54moCLqa9wRyhXTlghi/VSUSwGePGhbXopqn6j+ruX4IpzN3WSLS6ms/ndg6nV/v8aLVGdDFpXgpZEOJGIbswQDajiDEhle2b2gNuk8zxGF1jPZR6tn378BWg3eH94jDncYwqWQ+Hfd/GIyDNud81YpLMC78BkrwDqDnfgeZnzV8BtLOhBqLifAdpXgK8F0gVekSCJSBPdtdU4SuYIsblqQAZB39BxOFtVVtbuyBgiQfmmn8HSDKnrvrVG0yacRbUgYIbEH5AfgyBAfGijvSACaI29VZdEJ3tWz9wn4AFomDJB58qtRFyLtVBAAAAAElFTkSuQmCC"

/***/ }),

/***/ 592:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4T6WTzXHCQAyFn/bAcAsdxCW4BHcQSogvaH0jHZAOuBlxASoIqSDuAHcQ0gE5cmCVkcdmjDFkMtnbrqRPTz9L+OehvngRmarqExHFqlqq6muWZUWf7xVARGYAosFgME3T9LBcLuMQwpqIZsy87UIuAKvVanQ8Hgvvfdx2zPM8cs4VzBzdBeR5nhDR2Hs/7TqKiDLzleKLB8tERNsbCkpmHt1VYMbFYrElok9mfrF7Lf8NwIaZ578CrGmq+gFgpKp7IopU9d17P24Bd6q6sVIvSqgn8AxgHkIom2zD4bBsJnI6nWLnXAIgsaaeASKytoBmfF2pbWUhhBRAkWXZvgJY951zNmcjX512MIBvIkomk0mlsALUjVv3Lcq94DNARPZ9S2IOZgPw2M3cyKwU3FqSOvsOwJctWCO7XWMDOAB4aBts62wH7M2adevT9v7Gv/zwH4PhtBGvNQeUAAAAAElFTkSuQmCC"

/***/ }),

/***/ 593:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4T6WTzU3DQBCF3+BF4oY7wCVsDpHsmzsgxyhypNBB6MB0kBIc2ULcCBXg21ri4O2A0EG4RSJk0Do/bJwlCOGbtTPfvJl5Q/jnR658GQ3HYL4GkQSzBnCnq6J0xR4BZJikAAIsxVjrbCG7A0neWcaEVKti1oYcAKQc+XSxKuuqkHagDPsBkShrVQSnAWESg9DTqhi3AzvRkGuVHyk+VGAqQcycCiB0XRX+SQXmUUZD0+erVvlt8x/2A5B4BGiqVT75HdAdSAjvmQCfGXMiBAw8aZX3voHnNcBT02qrhSQlwohBk+36NgWXQu82As+TAMdEiM1Q9wAZJtk2uFlfW6pZp6XsBvgodfUwbwDSTB+U6iqPncayksH8zp/rWL/cG4NhA2gGx5nLKHbldvIe0ImSucskJsC8AXTlSrYAbpM0Nhaemfgbr9a9nWy7zaaFTpgsQHRpPxjXNR4AYIb109E6r/EvF/4FXk6sEdl++K0AAAAASUVORK5CYII="

/***/ }),

/***/ 600:
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*分期信息栏 */


//兼容ie
// import Abc from "xxx.js";

var StagingInformation = function (_React$Component) {
    _inherits(StagingInformation, _React$Component);

    function StagingInformation(arg) {
        _classCallCheck(this, StagingInformation);

        return _possibleConstructorReturn(this, (StagingInformation.__proto__ || Object.getPrototypeOf(StagingInformation)).call(this, arg));
    }

    _createClass(StagingInformation, [{
        key: "componentWillUpdate",
        value: function componentWillUpdate() {
            console.log(this.props.location);
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.bind_combobox();
            //  toolsTab.bindTab(this.props);//绑定头部标签
        }
    }, {
        key: "addTodo",
        value: function addTodo(text) {}
    }, {
        key: "bind_combobox",
        value: function bind_combobox() {
            var installmentState = $("#installmentState"); //分期状态
            installmentState.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "2017年首开项目", value: "0" }, { label: "2018年首开项目", value: "1" }, { label: "顺工项目", value: "2" }]
            });
            var selfSustaining = $("#selfSustaining"); //自持业态
            selfSustaining.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "无", value: "", "selected": true }, { label: "酒店", value: "0" }, { label: "写字楼", value: "1" }]
            });
            var tradersWay = $("#tradersWay"); //操盘方式
            tradersWay.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "完全操盘", value: "0" }, { label: "派总经理", value: "1" }, { label: "不派总经理", value: "2" }]
            });
            var tableManner = $("#tableManner"); //并表方式
            tableManner.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "A并表项目", value: "0" }, { label: "B非并表项目", value: "1" }]
            });
            var projectType = $("#projectType"); //项目类型
            projectType.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "全新开发", value: "0" }, { label: "升级改造项目", value: "1" }, { label: "其他", value: "2" }]
            });
            var taxManner = $("#taxManner"); //项目计税方式
            taxManner.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "一般计税", value: "0" }, { label: "简易计税", value: "1" }]
            });
            var controlStage = $("#controlStage"); //项目类型
            controlStage.combobox({
                valueField: "value",
                textField: "label",
                editable: true,
                readonly: false,
                panelHeight: "auto",
                data: [{ label: "请选择", value: "", "selected": true }, { label: "启动版", value: "0" }, { label: "基准版", value: "1" }, { label: "调整板（第1次）", value: "2" }, { label: "调整版（第2次）", value: "3" }, { label: "调整版（第N次）", value: "4" }, { label: "完结版", value: "5" }]
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
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
                                        "\u9879\u76EE\u540D\u79F0"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
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
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
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
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u5206\u671F\u7F16\u7801"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
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
                                    _react2.default.createElement("input", { type: "text", id: "installmentState" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u81EA\u6301\u7269\u4E1A"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "selfSustaining" })
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
                                    _react2.default.createElement("input", { type: "text", id: "tradersWay" })
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
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
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
                                    _react2.default.createElement("input", { className: "inputTextBox boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u6743\u76CA\u6BD4\u4F8B"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" }),
                                    _react2.default.createElement(
                                        "i",
                                        { className: "symbol" },
                                        "%"
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
                                        "\u5E76\u8868\u65B9\u5F0F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { type: "text", id: "tableManner" })
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
                                    _react2.default.createElement("input", { type: "text", id: "projectType" })
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
                                    _react2.default.createElement("input", { type: "text", id: "taxManner" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u5206\u671F\u521B\u5EFA\u65E5\u671F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
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
                                        "\u5206\u671F\u66F4\u65B0\u65E5\u671F"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing redFont" },
                                        "\u8BA1\u5212\u7BA1\u63A7\u9636\u6BB5"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", type: "text", id: "controlStage" })
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
                                        "\u542F\u52A8\u5F00\u53D1\u65F6\u95F4"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
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
                                        { className: "btn btnStyle uploadIconBtn" },
                                        "\u4E0A\u4F20"
                                    ),
                                    _react2.default.createElement(
                                        "button",
                                        { className: "btn btnStyle userApplyIconBtn" },
                                        "\u7F16\u8F91"
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
                                _react2.default.createElement("iframe", { src: "", width: "100%", height: "295px" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "item" },
                                _react2.default.createElement("iframe", { src: "", width: "100%", height: "295px" })
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

/***/ 601:
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 分期经济指标（投决会版）


//兼容ie
__webpack_require__(586);

var Indicators = function (_React$Component) {
    _inherits(Indicators, _React$Component);

    function Indicators(arg) {
        _classCallCheck(this, Indicators);

        return _possibleConstructorReturn(this, (Indicators.__proto__ || Object.getPrototypeOf(Indicators)).call(this, arg));
    }

    _createClass(Indicators, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
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
                            "\u5206\u671F\u7ECF\u6D4E\u6307\u6807"
                        ),
                        _react2.default.createElement(
                            "i",
                            null,
                            "\uFF08\u6295\u51B3\u4F1A\u7248\uFF09"
                        )
                    )
                ),
                _react2.default.createElement(
                    "section",
                    { className: "boxSizing" },
                    _react2.default.createElement(
                        "table",
                        { className: "formTable", width: "100%" },
                        _react2.default.createElement(
                            "colgroup",
                            null,
                            _react2.default.createElement("col", { width: "150" }),
                            _react2.default.createElement("col", { width: "" }),
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
                                        "\u603B\u7528\u5730\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u603B\u5EFA\u7B51\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u603B\u53EF\u552E\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
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
                                        "\u5206\u671F\u603B\u8D27\u503C"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement("th", null),
                                _react2.default.createElement("td", null),
                                _react2.default.createElement("th", null),
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
                                        { className: "formTableLabel boxSizing" },
                                        "\u5730\u4E0A\u5EFA\u7B51\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5730\u4E0A\u53EF\u552E\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5730\u4E0A\u4E0D\u53EF\u552E\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
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
                                        "\u5730\u4E0B\u5EFA\u7B51\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5730\u4E0B\u53EF\u552E\u9762\u79EF\uFF08\u975E\u8F66\u4F4D\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5730\u4E0B\u4E0D\u53EF\u552E\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
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
                                        "\u5730\u4E0B\u5EFA\u7B51\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5730\u4E0B\u53EF\u552E\u9762\u79EF\uFF08\u975E\u8F66\u4F4D\uFF09"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    _react2.default.createElement(
                                        "label",
                                        { className: "formTableLabel boxSizing" },
                                        "\u5730\u4E0B\u4E0D\u53EF\u552E\u9762\u79EF"
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement("input", { readOnly: "readonly", className: "inputTextBox inputGray boxSizing", type: "text", value: "" })
                                )
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