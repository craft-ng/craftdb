"use strict";
const Koa = require('koa');
const Mvc_1 = require("../koa-mvc-server/Mvc");
const KoaRouter = require('koa-router');
const views = require('koa-views');
const serveStatic = require('koa-static');
const app = new Koa();
const router = new KoaRouter();
app.use(serveStatic('.www'));
//
// var nestedRouter = new KoaRouter();
// nestedRouter.get('/view', async(ctx: Koa.Context, next: Function)=> {
//     // await next();
//     await ctx.render('index');
//     // ctx.body = 'Nested view';
// });
//
// router
//     .get('/', async(ctx: Koa.Context, next: Function)=> {
//         // await next();
//         await ctx.render('user/profile');
//     })
//     .get('/about', async(ctx: Koa.Context, next: Function)=> {
//         // await next();
//         ctx.body = 'About info comes here...';
//     });
//
// router.use('/nested', views(__dirname + '/admin/views', {
//         map: {pug: 'pug'},
//         extension: 'pug'
//     }), nestedRouter.routes()
// );
// app.use(views(__dirname + '/views', {
//     map: {pug: 'pug'},
//     extension: 'pug'
// }));
//
// app.use(router.middleware());
// const subApp: Koa = new Koa();
// subApp
//     .use(views(__dirname + '/admin/views', {
//         map: {pug: 'pug'},
//         extension: 'pug'
//     }))
//     .use(new UserController().getRouter().middleware());
//
// app.use(mount('/user', subApp));
// app.use(router.middleware());
// mvcArea('/admin/:name', {
//     parentRouter: router,
//     viewsDirectory: __dirname + '/admin/views'
// });
var mvc = new Mvc_1.Mvc();
mvc.registerAreas(__dirname, ['/admin', '/home'], {
    viewConvention: 'views/'
});
app.use(mvc.routes());
// app.use(mvcArea('/root'));
app.listen(3010);
