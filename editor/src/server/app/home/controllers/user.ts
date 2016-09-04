import Koa = require("koa");
import {MvcController} from "../../../koa-mvc-server/Mvc";
const KoaRouter = require('koa-router');


class UserController implements MvcController {

    public getRouter() {
        const router = new KoaRouter();

        return router
            .get('/', async(ctx: Koa.Context, next: Function)=> {
                ctx.body = 'Home User list';
            })
            .get('/view', async(ctx: Koa.Context, next: Function)=> {
                await ctx.render('index');
            })
            .get('/:name/show', async(ctx: Koa.Context, next: Function)=> {
                ctx.body = `Home User name is ${ctx.params.name}`;
            });
    }
}

export = UserController;
