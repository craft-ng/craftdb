import Koa = require("koa");
import mount = require('koa-mount')
import {MvcAreaOptions} from "./MvcAreaOptions";
import extend = require("extend");
import path = require('path');
const views = require('koa-views');
const KoaRouter = require('koa-router');

export function mvcArea(name: string, options: MvcAreaOptions) {

    options = extend(<MvcAreaOptions>{
        rootRoute: name,
        viewsDirectory: path.join(name, 'views'),
        viewMiddleware: views(options.viewsDirectory, {
            map: {pug: 'pug'},
            extension: 'pug'
        })
    }, options);

    // const areaRouter = new KoaRouter();
    // areaRouter
    //     .get('/', async(ctx: Koa.Context, next: Function)=> {
    //         ctx.body = 'inner mvc area route!'
    //     })
    //     .get('/:name', async(ctx: Koa.Context, next: Function)=> {
    //         console.log(ctx.params);
    //         // ctx.body = ctx.params;
    //         await ctx.render('index');
    //     });

    options.parentRouter.use(
        options.rootRoute,
        options.viewMiddleware,
        options.routes
    );

    // return mount(root, );
    // return function (ctx: Koa.Context, next: ()=>Promise<any>) {
    //     ctx.body = 'mvc area';
    // }
}