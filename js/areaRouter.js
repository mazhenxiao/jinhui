export const areaRouter = [
    {
        path: "/AreaInfo",
        redirect: {
            from: "/AreaInfo",
            to: "/AreaInfo/areaManage"
        }
    },
    {  //面积管理
        path: "/AreaInfo/areaManage",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../area/index.js');
                callback(null, app.default);
            }, "area-manage");
        }
    },
    {//签约*/
        path: "/AreaInfo/sign",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../payment/sign-index.js');
                callback(null, app.default);
            }, "sign-index");
        }
    },
    {//回款*/
        path: "/AreaInfo/payment",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../payment/payment-index.js');
                callback(null, app.default);
            }, "payment-index");
        }
    },
    {
        /*关键指标*/
        path: "/AreaInfo/primarykey",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../primaryKey/index.js');
                callback(null, app.default);
            }, "primaryKey-index");
        }

    },
    {
        /*关键指标*/
        path: "/AreaInfo/primarykeyTarget",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../primarykeyTarget/index.js');
                callback(null, app.default);
            }, "primarykeyTarget-index");
        }

    },
    {//*重点事项*/
        path: "/AreaInfo/priority",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../priority/index.js');
                callback(null, app.default);
            }, "priority-index");
        }

    },
    {//*供货*/
        path: "/AreaInfo/supply",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../supply/index.js');
                callback(null, app.default);
            }, "supply-index");
        }

    },

    { //项目团队维护
        path: "/AreaInfo/groupbuild",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../groupBuild/index.js');//============================价格管理
                callback(null, app.default);
            }, "groupBuild-index");
        }
    },
    { //价格管理
        path: "/AreaInfo/priceControl",
        getComponent: function (next, callback) {
            require.ensure([], function (require) {
                var app = require('../price/component-priceControl.js');//============================价格管理
                callback(null, app.default);
            }, "component-priceControl");
        }
    },
]