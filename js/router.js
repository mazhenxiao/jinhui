import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from "react-router";
import "babel-polyfill";  //兼容ie
import iss from "./iss.js";//公共类
iss.use({ Router, Route, hashHistory })
/* 路由 */
var rootRout = {
  path: "/",
  childRoutes: [
    {
      path: "/index",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-index.js');//============================生日祝福
          callback(null, app.default);
        }, "component-index");
      },
      onEnter(nextLocation){
      }
    },
    {
      path:"/identity",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-identity.js');//============================生日祝福
          callback(null, app.default);
        }, "component-identity");
      }
    },
    {
      path:"/supply",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-supply.js');//============================生日祝福
          callback(null, app.default);
        }, "component-supply");
      }
    },
    {
      path:"/projectList",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-projectList.js');//============================生日祝福
          callback(null, app.default);
        }, "component-projectList");
      }
    },//代办
    {
      path:"/agenty",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-agenty.js');//============================生日祝福
          callback(null, app.default);
        }, "component-agenty");
      }
    },//弹出层
    {
      path:"/todo",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-todo.js');//============================生日祝福
          callback(null, app.default);
        }, "component-todo");
      }
    }
   
  ]
}
ReactDOM.render(<Router history={hashHistory} routes={rootRout}></Router>, document.querySelector("#JH-Router"));

export default rootRout;