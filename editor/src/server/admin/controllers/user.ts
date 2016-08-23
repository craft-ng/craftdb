import Koa = require("koa");
const KoaRouter = require('koa-router');

export class UserController {
    //registerRoutes(router: KoaRouter)

    getRouter() {

        const router = new KoaRouter();

        return router
            .get('/', async(ctx: Koa.Context, next: Function)=> {
                ctx.body = 'User list';
            })
            .get('/:name', async(ctx: Koa.Context, next: Function)=> {
                ctx.body = `User name is ${ctx.params.name}`;
            });
    }
}