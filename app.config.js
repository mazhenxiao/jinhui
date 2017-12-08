const config = {
    'development': {
        domain: "http://192.168.10.164:8000",
        port: 8090,//前端项目监听端口
    },
    'test': {
        domain: "http://192.168.10.164:8000",
        port: 8090,//前端项目监听端口
    },
    'uat': {
        domain: "http://pocstest.radiance.com.cn:10016",//服务端接口
        port: 10013,//前端项目监听端口
    },
    'prod': {
        domain: "http://pocs.radiance.com.cn:10016",//TODO 未确定生产环境 服务端的端口
        port: 10010,//前端项目监听端口
    },
};

const appConfig = config[process.env.NODE_ENV || "test"];
module.exports = appConfig;