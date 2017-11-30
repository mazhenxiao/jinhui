const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const render = require('koa-ejs');
const path = require('path');
var c = require('child_process');
var staticServer = require('koa-static');

render(app, {
    root: path.join(__dirname, "view"),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});
app.use(staticServer(
    path.join(__dirname, "./")
))
/*   app.use( async ( ctx ) => {
       
  }) */
app.use(router.routes());
app.use(async (ctx, next) => {
    // console.log(app);
    // this.render("index",{layout:false})
    await next();
});
router.get('/', async (ctx, next) => {
    await ctx.render("login", {layout: false})
})
.get('/login', async (ctx, next) => {
    await ctx.render("login", {layout: false})
})
.get('/index', async (ctx, next) => {
    // this // ctx.render("index",{layout:false})
    await ctx.render("index", {layout: false})
})
.get('/AreaInfo', async (ctx, next) => {
    await ctx.render("AreaInfo", {layout: false})
})

app.listen(3000, arg => {
    // c.exec("npm run dev");
    console.log("启动成功，请访问 http://localhost:3000/login");
});

c.exec('start http://localhost:3000/login');