"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Koa = require("koa");
// const KoaRouter = require('koa-router');
const views = require('koa-views');
;
const consolidate = require('consolidate');
const app = new Koa();
// const router = new KoaRouter();
app.use(views(__dirname + '/views', {
    map: { pug: 'pug' },
    extension: 'pug'
}));
// app.use(views('/home/pbalaga/Projects/craft/editor/.dist'));
app.use(function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //ctx.body = 'Hello';
        // var c = consolidate['pug']('/home/pbalaga/Projects/craft/editor/.dist/views/layout.pug').then(html=>
        //     console.log(html));
        yield ctx.render('user/profile');
    });
});
console.log(__dirname);
app.listen(3010);
