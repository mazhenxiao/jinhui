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
      path: "/identity",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-identity.js');//============================生日祝福
          callback(null, app.default);
        }, "component-identity");
      }
    },
    {
      path: "/supply",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-supply.js');//============================生日祝福
          callback(null, app.default);
        }, "component-supply");
      }
    },
    {
      path: "/projectList",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-projectList.js');//============================生日祝福
          callback(null, app.default);
        }, "component-projectList");
      }
    },//代办
    {
      path: "/agenty",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-agenty.js');//============================生日祝福
          callback(null, app.default);
        }, "component-agenty");
      }
    },//弹出层
    {
      path: "/todo",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-todo.js');//============================生日祝福
          callback(null, app.default);
        }, "component-todo");
      }
    },
    { //分期
      path: "/intallment",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-intallment.js');//============================分期
          callback(null, app.default);
        }, "component-intallment");
      }
    },
    { //项目
      path: "/newProject",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-newProject.js');//============================分期
          callback(null, app.default);
        }, "component-newProject");
      }
    },
    { //价格管理 
      path: "/priceControl",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl.js');//============================价格管理
          callback(null, app.default);
        }, "component-priceControl");
      }
    },
    { //价格管理-投决会
      path: "/component-priceControl-Investment",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Investment.js');//============================价格管理-投决会
          callback(null, app.default);
        }, "component-priceControl-Investment");
      }
    },
    { //价格管理-产品定位会
      path: "/component-priceControl-Productlocat",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Productlocat.js');//============================价格管理-产品定位会
          callback(null, app.default);
        }, "component-priceControl-Productlocat");
      }
    },
    { //价格管理-项目定位会
      path: "/component-priceControl-Projectlocat",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Projectlocat.js');//============================价格管理-项目定位会
          callback(null, app.default);
        }, "component-priceControl-Projectlocat");
      }
    },
    { //价格管理-启动会
      path: "/component-priceControl-Startup",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Startup.js');//============================价格管理-项目定位会
          callback(null, app.default);
        }, "component-priceControl-Startup");
      }
    },
    { //价格管理-工规证
      path: "/component-priceControl-Certificate",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Certificate.js');//============================价格管理-工规证
          callback(null, app.default);
        }, "component-priceControl-Certificate");
      }
    },
    { //价格管理-决策书
      path: "/component-priceControl-Decision",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Decision.js');//============================价格管理-决策书
          callback(null, app.default);
        }, "component-priceControl-Decision");
      }
    },
    { //价格管理-预售证
      path: "/component-priceControl-Presell",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Presell.js');//============================价格管理-预售证
          callback(null, app.default);
        }, "component-priceControl-Presell");
      }
    },
    { //价格管理-签约
      path: "/component-priceControl-Contract",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Contract.js');//============================价格管理-签约
          callback(null, app.default);
        }, "component-priceControl-Contract");
      }
    },
    { //价格管理-交付
      path: "/component-priceControl-Deliver",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Deliver.js');//============================价格管理-交付
          callback(null, app.default);
        }, "component-priceControl-Deliver");
      }
    },
    { //价格管理-表格页
      path: "/component-priceControl-Management",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-priceControl-Management.js');//============================价格管理-表格页
          callback(null, app.default);
        }, "component-priceControl-Management");
      }
    },
    { //面积
      path: "/areaManagement",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-areaManagement.js');//============================价格管理-交付
          callback(null, app.default);
        }, "component-areaManagement");
      }

    },
    { //发起审批
      path: "/newProjectApproval",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../components/component-newProjectApproval.js');//============================价格管理-交付
          callback(null, app.default);
        }, "component-newProjectApproval");
      }

    } 
  ] 
  
}
ReactDOM.render(<Router history={hashHistory} routes={rootRout}></Router>, document.querySelector("#JH-Router"));
export default rootRout;