const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const render = require('koa-ejs');
const path = require('path');
var c = require('child_process');
var staticServer = require('koa-static');
var process = require("process");
const appConfig = require("./app.config");

render(app, {
    root: path.join(__dirname, "view"),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

app.use(staticServer(
    path.join(__dirname, "./")
));


app.use(router.routes());

const errorHandle = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
};

app.use(errorHandle);

var evn = process.env.NODE_ENV || "dev";
var loginHtml = `login-${evn}`;
var oaLoginHtml = `oa-login-${evn}`;

router.get('/', async (ctx, next) => {
    await ctx.render(loginHtml, {layout: false})
})
    .get('/Account/OALogin', async (ctx, next) => {
        await ctx.render(oaLoginHtml, {layout: false})
    })
    .get('/login', async (ctx, next) => {
        await ctx.render(loginHtml, {layout: false})
    })
    .get('/index', async (ctx, next) => {
        // this // ctx.render("index",{layout:false})
        await ctx.render("index", {layout: false})
    })
    .get('/AreaInfo', async (ctx, next) => {
        await ctx.render("AreaInfo", {layout: false})
    });

let port = appConfig["port"] || 8090;
app.listen(port, arg => {
    c.exec(`start http://localhost:${port}/login`);
    console.log(`启动成功，请访问 http://localhost:${port}/login`);
});

