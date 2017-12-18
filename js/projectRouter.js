export const projectRouter=[
  {
    path: "/index",
    getComponent: function (next, callback) {
      require.ensure([], function (require) {
        var app = require('../overviewIndex/index.js');//============================首页
        callback(null, app.default);
      }, "index");
    }
  },
      {
        path: "/draft",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-draft.js');//============================我的草稿
            callback(null, app.default);
          }, "component-draft");
        }
      },
      {
        path: "/apply",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-apply.js');//============================我的申请
            callback(null, app.default);
          }, "component-apply");
        }
      },
      {
        path: "/approalHistory",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-approalHistory.js');//============================我的历史
            callback(null, app.default);
          }, "component-approalHistory");
        }
      },
      {
        path: "/identity",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-identity.js');//============================项目身份
            callback(null, app.default);
          }, "component-identity");
        }
      },
      {
        path: "/supply",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-supply.js');//============================双向滚动demo
            callback(null, app.default);
          }, "component-supply");
        }
      },
       //代办
      {
        path: "/agenty",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-agenty.js');//============================我的待审
            callback(null, app.default);
          }, "component-agenty");
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
     
      { //面积
        path: "/areaManagement",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-areaManagement.js');//============================价格管理-交付
            callback(null, app.default);
          }, "component-areaManagement");
        }
  
      },
      { //发起审批 提交人
        path:"/ProcessApproval",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-ProcessApproval.js');//============================价格管理-交付
            callback(null, app.default);
          }, "component-ProcessApproval");
        }
      },
      { //发起审批 审批人
        path:"/ProcessApprover",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-ProcessApprover.js');//============================价格管理-交付
            callback(null, app.default);
          }, "component-ProcessApprover");
        }
      },
      { //发起审批项目
        path: "/newProjectApproval", 
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-newProjectApproval.js');//============================价格管理-交付
            callback(null, app.default);
          }, "component-newProjectApproval");
        }
  
      },
      { //发起审批分期
        path: "/newProjectStage",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var app = require('../components/component-newProjectStage.js');//============================价格管理-交付
            callback(null, app.default);
          }, "component-newProjectStage");
        }
      }
]