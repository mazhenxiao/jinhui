export const basicRouter=[
    {
        path: "/basicSetting",
        redirect: {
            from: "/basicSetting",
            to: "/basicSetting/assessmentVersion"
        }
    },
    {
        path: "/basicSetting/assessmentVersion",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../basicSetting/assessmentVersion-index.js');
                callback(null, app.default);
            }, "assessmentVersion-index");
        }
    },
  ]