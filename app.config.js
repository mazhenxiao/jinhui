const config = {
    'dev': {
        env: "dev",
        domain: "http://192.168.10.164:8000",//服务端接口
        port: 8090,//前端项目监听端口
    },
    'test': {
        env: "test",
        domain: "http://192.168.10.164:8000",//服务端接口
        port: 8090,//前端项目监听端口
    },
    'uat': {
        env: "uat",
        domain: "",//服务端接口
        port: 10013,//前端项目监听端口
    },
    'prod': {
        env: "prod",
        domain: "",//服务端接口
        port: 10010,//前端项目监听端口
    },
};

const appConfig = config[process.env.NODE_ENV || "test"];
module.exports = appConfig;
