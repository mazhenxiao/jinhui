const config = {
    'dev': {
        env: "dev",
        domain: "http://localhost:80",//服务端接口
        port: 8090,//前端项目监听端口
    },
    'cloud': {
        env: "cloud",
        domain: "http://39.106.71.187:8000",//服务端接口
        port: 8090 //前端项目监听端口
    },
    'test': {
        env: "test",
        domain: "http://192.168.10.164:8000",//服务端接口
        port: 8090,//前端项目监听端口
    },
    'uat': {
        env: "uat",
        domain: "http://pocstest.radiance.com.cn:10016",//服务端接口
        port: 10013,//前端项目监听端口
    },
    'prod': {
        env: "prod",
        domain: "http://pocs.radiance.com.cn:10013",//服务端接口
        port: 10010,//前端项目监听端口
    }
};

const appConfig = config[process.env.NODE_ENV || "dev"];
module.exports = appConfig;