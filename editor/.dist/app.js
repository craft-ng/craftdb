"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Koa = require('koa');
const mount = require('koa-mount');
const user_1 = require('./admin/controllers/user');
const KoaRouter = require('koa-router');
const views = require('koa-views');
const serveStatic = require('koa-static');
const app = new Koa();
const router = new KoaRouter();
app.use(serveStatic('.www'));
router
    .get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    // await next();
    yield ctx.render('user/profile');
}))
    .get('/about', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    // await next();
    ctx.body = 'About info comes here...';
}));
app.use(views(__dirname + '/views', {
    map: { pug: 'pug' },
    extension: 'pug'
}));
app.use(router.middleware());
const subApp = new Koa();
subApp.use(new user_1.UserController().getRouter().middleware());
app.use(mount('/user', subApp));
app.listen(3010);
