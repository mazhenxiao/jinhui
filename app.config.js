const config = {
    'development': {
        domain: "http://192.168.14.168",
    },
    'test': {
        domain: "http://192.168.14.168",
    },
    'prod': {
        domain: "http://192.168.14.168",
    },
};

const appConfig = config[process.env.NODE_ENV || "development"];

export default appConfig;