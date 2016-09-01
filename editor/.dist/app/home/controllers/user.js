"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const KoaRouter = require('koa-router');
class UserController {
    getRouter() {
        const router = new KoaRouter();
        return router
            .get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = 'Home User list';
        }))
            .get('/view', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.render('index');
        }))
            .get('/:name/show', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = `Home User name is ${ctx.params.name}`;
        }));
    }
}
module.exports = UserController;
