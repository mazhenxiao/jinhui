import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from "react-router";
import "babel-polyfill";  //兼容ie
import iss from "./iss.js";//公共类
iss.use({ Router, Route, hashHistory })
/* 路由 */
/*     {
      path: "/index",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../area');//============================首页
          callback(null, app.default);
        }, "area-index");
      }
    }, */
var rootRout = {
  path: "/",
  childRoutes: [

    {  //面积管理
      path: "/areaManage",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../area/index.js');
          callback(null, app.default);
        }, "area-manage");
      }
    },
    {//签约回款*/
      path: "/payment",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../payment/index.js');
          callback(null, app.default);
        }, "payment-index");
      }
    },
    {/*关键指标*/
      path: "/primarykey",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../primaryKey/index.js');
          callback(null, app.default);
        }, "primaryKey-index");
      }
      
    },
    {//*重点事项*/
      path: "/priority",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../priority/index.js');
          callback(null, app.default);
        }, "priority-index");
      }
      
    },
    {//*供货*/
      path: "/supply",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../supply/index.js');
          callback(null, app.default);
        }, "supply-index");
      }
      
    },
    
    { //项目团队维护 
      path: "/groupbuild",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../groupBuild/index.js');//============================价格管理
          callback(null, app.default);
        }, "groupBuild-index");
      }
    },
    { //价格管理 
      path: "/priceControl",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl.js');//============================价格管理
          callback(null, app.default);
        }, "component-priceControl");
      }
    },
  ] 
}
ReactDOM.render(<Router history={hashHistory} routes={rootRout}></Router>, document.querySelector("#JH-Router"));
export default rootRout;