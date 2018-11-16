const config = {
    'dev': {
        env: "dev",
        // domain: "http://localhost",//本地服务端口
        domain: "http://39.106.71.187:8000",//服务端接口
        port: 8090,//前端项目监听端口
    },
    'cloud': {
        env: "cloud",
        domain: "http://39.106.71.187:8000",//服务端接口
        port: 8090 //前端项目监听端口
    },
    'test': {
        env: "test",
        // domain: "http://192.168.10.164:8000",//服务端接口
        domain: "http://39.106.71.187:8000",//服务端接口
        port: 8090,//前端项目监听端口
    },
    'uat': {
        env: "uat",
        domain: "",//服务端接口
        port: 10013,//前端项目监听端口
    },
    'production': {
        env: "prod",
        domain: "",//服务端接口
        port: 10010,//前端项目监听端口
    }
};

const appConfig = config[process.env.NODE_ENV || "dev"];
module.exports = appConfig;
