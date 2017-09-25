webpackJsonp([5],{

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //兼容ie
//公共类
//路由
//头部


var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(78);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(77);

var _iss = __webpack_require__(65);

var _iss2 = _interopRequireDefault(_iss);

var _router = __webpack_require__(231);

var _router2 = _interopRequireDefault(_router);

var _toolsList = __webpack_require__(570);

var _toolsList2 = _interopRequireDefault(_toolsList);

var _toolsLeftTree = __webpack_require__(571);

var _toolsLeftTree2 = _interopRequireDefault(_toolsLeftTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//左侧树形
/* 公共页面js */
var main = function () {
  function main() {
    _classCallCheck(this, main);

    var th = this;

    this.TransHeight();
    this.bindScroll();
    this.bingBar();
    //document.addEventListener("fullscreenchange",th.TransHeight,false);
    // document.addEventListener("mozfullscreenchange",th.TransHeight,false);
    // document.addEventListener("msfullscreenchange",th.TransHeight,false);
    window.onresize = this.TransHeight;
  }

  _createClass(main, [{
    key: 'TransHeight',
    value: function TransHeight() {
      var JH_Nav = document.querySelector(".JH-Nav"),
          JH_Content = document.querySelector(".JH-Content"),
          h = 640;
      var rh = JH_Content.offsetHeight,
          lh = JH_Nav.offsetHeight,
          $wh = Math.max(document.body.clientHeight, document.documentElement.clientHeight) - 60;
      var $h = Math.max(rh, lh, $wh, 640);
      JH_Nav.style.minHeight = $h + "px";
      JH_Content.style.minHeight = $h - 10 + "px";
    }
  }, {
    key: 'bindScroll',
    value: function bindScroll() {
      var JHNav = $(".JH-Nav"),
          win = $(window),
          bs = $(".icon-bar");
      window.onscroll = function (ev) {
        var top = win.scrollTop(),
            left = win.scrollLeft(),
            icons = $(".icon-bar");
        if (top >= 60) {
          if (JHNav.hasClass("fixed")) {
            return;
          }
          JHNav.addClass("fixed");
        } else {
          JHNav.removeClass("fixed");
        }
        /* if(left>20){
          bs.addClass("hide")
        }else{
          bs.removeClass("hide")
        } */
      };
    }
  }, {
    key: 'bingBar',
    value: function bingBar() {
      var cont = $(".JH-RightBox"),
          icons = $(".icon-bar");
      icons.bind("click.bar", function (e) {
        var el = $(e.currentTarget),
            pa = $(el.attr("target"));
        pa.toggleClass("active");
        cont.toggleClass("active");
        icons.trigger("EVENT_TOGGLEBAR");
      });
    }
  }]);

  return main;
}();

new main();

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 总头部 */


//兼容ie
var ToolsList = function (_React$Component) {
    _inherits(ToolsList, _React$Component);

    function ToolsList(arg) {
        _classCallCheck(this, ToolsList);

        return _possibleConstructorReturn(this, (ToolsList.__proto__ || Object.getPrototypeOf(ToolsList)).call(this, arg));
    }

    _createClass(ToolsList, [{
        key: 'EVENT_CLICK',
        value: function EVENT_CLICK(str, th) {

            switch (str) {
                case "index":
                    iss.hashHistory.push("index");break;
                case "agenty":
                    iss.hashHistory.push("agenty");break;
                case "projectList":
                    iss.hashHistory.push("projectList");break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'article',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'userLogin' },
                    _react2.default.createElement(
                        'b',
                        { className: 'userName' },
                        '\u6B27\u9633\u5C11\u534E'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'userTancen boxSizing' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'userPending', onClick: this.EVENT_CLICK.bind(this, "agenty"), href: 'javascript:;' },
                                '\u6211\u7684\u5F85\u5BA1'
                            ),
                            _react2.default.createElement(
                                'i',
                                { className: 'redFont' },
                                '(2)'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'userApply ', href: '#' },
                                '\u6211\u7684\u7533\u8BF7'
                            ),
                            _react2.default.createElement(
                                'i',
                                { className: 'redFont' },
                                '(12)'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'userDraft', href: '#' },
                                '\u6211\u7684\u8349\u7A3F'
                            ),
                            _react2.default.createElement(
                                'i',
                                { className: 'redFont' },
                                '(12)'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'userHistory', href: '#' },
                                '\u5BA1\u6279\u5386\u53F2'
                            ),
                            _react2.default.createElement(
                                'i',
                                { className: 'redFont' },
                                '(12)'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'userExit', href: '#' },
                                '\u9000\u51FA'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'h1',
                    { className: 'xtName' },
                    '\u91D1\u8F89\u96C6\u56E2\u8FD0\u8425\u7BA1\u63A7\u7CFB\u7EDF'
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { className: 'active', onClick: this.EVENT_CLICK.bind(this, "index"), href: 'javascript:;' },
                            '\u9879\u76EE\u5217\u8868'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            '\u4FE1\u606F\u586B\u62A5'
                        ),
                        _react2.default.createElement(
                            'ol',
                            { className: 'subMenu' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'areaManagement.html' },
                                    '\u9762\u79EF\u7BA1\u7406'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'priceManagement.html' },
                                    '\u4EF7\u683C\u7BA1\u7406'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'InformationProvidedSupply.html' },
                                    '\u4F9B\u8D27'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'signingReceivable.html' },
                                    '\u7B7E\u7EA6\u4E0E\u56DE\u6B3E'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'keyIssues.html' },
                                    '\u91CD\u70B9\u4E8B\u9879'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'keyIndicators.html' },
                                    '\u5173\u952E\u6307\u6807'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            '\u62A5\u8868\u7BA1\u7406'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            '\u57FA\u7840\u8BBE\u7F6E'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            '\u697C\u680B\u5339\u914D'
                        )
                    )
                )
            );
        }
    }]);

    return ToolsList;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(ToolsList, null), document.querySelector("#JH-Header"));

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(78);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(77);

var _iss = __webpack_require__(65);

var _iss2 = _interopRequireDefault(_iss);

var _toolsTree = __webpack_require__(572);

var _toolsTree2 = _interopRequireDefault(_toolsTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //兼容ie
//公共类


//树控件
var ToolsTree = function (_React$Component) {
    _inherits(ToolsTree, _React$Component);

    function ToolsTree(arg) {
        _classCallCheck(this, ToolsTree);

        return _possibleConstructorReturn(this, (ToolsTree.__proto__ || Object.getPrototypeOf(ToolsTree)).call(this, arg));
    }

    _createClass(ToolsTree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _toolsTree2.default.bindTree("#tree");
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'header',
                    null,
                    _react2.default.createElement(
                        'p',
                        { className: 'headSate' },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u72B6\u6001\uFF1A'
                        ),
                        _react2.default.createElement(
                            'select',
                            null,
                            _react2.default.createElement(
                                'option',
                                null,
                                '\u5168\u90E8'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'JH-LeftNav' },
                    _react2.default.createElement(
                        'p',
                        { className: 'JH-TreeTitle' },
                        '\u9879\u76EE\u540D\u79F0'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'treeBox' },
                        _react2.default.createElement('ul', { id: 'tree' })
                    )
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'icon-bar', target: '.JH-Nav' },
                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-menu-right' })
                )
            );
        }
    }]);

    return ToolsTree;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(ToolsTree, null), document.querySelector("#JH-Nav"));

/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* import React from 'react';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     import ReactDOM from 'react-dom'; */


var _iss = __webpack_require__(65);

var _iss2 = _interopRequireDefault(_iss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $tree = function () {
    function $tree(ele) {
        _classCallCheck(this, $tree);

        this.data = [{
            "id": 1,
            "text": "My Documents",
            "children": [{
                "id": 11,
                "text": "Photos",
                "state": "closed",
                "children": [{
                    "id": 111,
                    "text": "Friend"
                }, {
                    "id": 112,
                    "text": "Wife"
                }, {
                    "id": 113,
                    "text": "Company"
                }]
            }, {
                "id": 12,
                "text": "Program Files",
                "children": [{
                    "id": 121,
                    "text": "Intel"
                }, {
                    "id": 122,
                    "text": "Java",
                    "attributes": {
                        "p1": "Custom Attribute1",
                        "p2": "Custom Attribute2"
                    }
                }, {
                    "id": 123,
                    "text": "Microsoft Office"
                }, {
                    "id": 124,
                    "text": "Games",
                    "checked": true
                }]
            }, {
                "id": 13,
                "text": "index.html"
            }, {
                "id": 14,
                "text": "about.html"
            }, {
                "id": 15,
                "text": "welcome.html"
            }]
        }];
    }

    _createClass($tree, [{
        key: "bindTree",
        value: function bindTree(ele) {
            var th = this;
            this.ele = $(ele);
            this.ele.tree({
                data: th.data
            });
            setTimeout(function (arg) {
                th.bindScroll();
            });
        }
    }, {
        key: "bindScroll",
        value: function bindScroll() {
            var th = this;
            var pa = this.ele.parent(),
                id = pa.attr("id") || "tree-" + new Date().getTime();
            pa.attr("id", id);
            pa.mCustomScrollbar({
                autoDraggerLength: true,
                scrollButtons: { enable: true }
            });
        }
    }]);

    return $tree;
}();

var tree = new $tree();
exports.default = tree;

/***/ })

},[243]);