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
      path: "/index",
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
   /*  { //价格管理-投决会
      path: "/component-priceControl-Investment",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Investment.js');//============================价格管理-投决会
          callback(null, app.default);
        }, "component-priceControl-Investment");
      }
    },
    { //价格管理-产品定位会
      path: "/component-priceControl-Productlocat",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Productlocat.js');//============================价格管理-产品定位会
          callback(null, app.default);
        }, "component-priceControl-Productlocat");
      }
    },
    { //价格管理-项目定位会
      path: "/component-priceControl-Projectlocat",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Projectlocat.js');//============================价格管理-项目定位会
          callback(null, app.default);
        }, "component-priceControl-Projectlocat");
      }
    },
    { //价格管理-启动会
      path: "/component-priceControl-Startup",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Startup.js');//============================价格管理-项目定位会
          callback(null, app.default);
        }, "component-priceControl-Startup");
      }
    },
    { //价格管理-工规证
      path: "/component-priceControl-Certificate",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Certificate.js');//============================价格管理-工规证
          callback(null, app.default);
        }, "component-priceControl-Certificate");
      }
    },
    { //价格管理-决策书
      path: "/component-priceControl-Decision",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Decision.js');//============================价格管理-决策书
          callback(null, app.default);
        }, "component-priceControl-Decision");
      }
    },
    { //价格管理-预售证
      path: "/component-priceControl-Presell",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Presell.js');//============================价格管理-预售证
          callback(null, app.default);
        }, "component-priceControl-Presell");
      }
    },
    { //价格管理-签约
      path: "/component-priceControl-Contract",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Contract.js');//============================价格管理-签约
          callback(null, app.default);
        }, "component-priceControl-Contract");
      }
    },
    { //价格管理-交付
      path: "/component-priceControl-Deliver",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Deliver.js');//============================价格管理-交付
          callback(null, app.default);
        }, "component-priceControl-Deliver");
      }
    },
    { //价格管理-表格页
      path: "/component-priceControl-Management",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('../price/component-priceControl-Management.js');//============================价格管理-表格页
          callback(null, app.default);
        }, "component-priceControl-Management");
      } 
    },
      */
  ] 
}
ReactDOM.render(<Router history={hashHistory} routes={rootRout}></Router>, document.querySelector("#JH-Router"));
export default rootRout;