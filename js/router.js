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
    },
    { //分期
      path:"/intallment",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-intallment.js');//============================分期
          callback(null, app.default);
        }, "component-intallment");
      }
    }, 
    { //项目
      path:"/newProject", 
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-newProject.js');//============================分期
          callback(null, app.default);
        }, "component-newProject");
      } 
    },
    /* { //价格管理 
      path:"/priceControl", 
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl.js');//============================价格管理
          callback(null, app.default);
        }, "component-priceControl"); 
      } 
    },
     { //价格管理-投决会
      path:"/priceInvestment",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceInvestment.js');//============================价格管理-投决会
          callback(null, app.default);
        }, "component-priceInvestment");  
      } 
    } */ 
  ]  
}
ReactDOM.render(<Router history={hashHistory} routes={rootRout}></Router>, document.querySelector("#JH-Router"));

export default rootRout;