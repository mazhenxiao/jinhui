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
        domain: "http://192.168.5.82:8000",
        port: 10013,//前端项目监听端口
    },
    'prod': {
        domain: "http://192.168.5.85:xxxx",//TODO 未确定生产环境 服务端的端口
        port: 10010,//前端项目监听端口
    },
};

const appConfig = config[process.env.NODE_ENV || "development"];
export default appConfig;