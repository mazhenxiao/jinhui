export const reportFormRouter=[
    {  //项目清单
        path: "/reportForm/projectList",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../reportForm/projectList.js');
                callback(null, app.default);
            }, "reportForm-projectList");
        }
    },
    {  //年度供销存计划汇总
        path: "/reportForm/planSummary",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../planSummary/index.js');
                callback(null, app.default);
            }, "planSummary-index");
        }
    }
]