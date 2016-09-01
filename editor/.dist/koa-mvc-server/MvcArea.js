"use strict";
const extend = require("extend");
const path = require('path');
const views = require('koa-views');
const KoaRouter = require('koa-router');
function mvcArea(name, options) {
    options = extend({
        rootRoute: name,
        viewsDirectory: path.join(name, 'views'),
        viewMiddleware: views(options.viewsDirectory, {
            map: { pug: 'pug' },
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
    options.parentRouter.use(options.rootRoute, options.viewMiddleware, options.routes);
    // return mount(root, );
    // return function (ctx: Koa.Context, next: ()=>Promise<any>) {
    //     ctx.body = 'mvc area';
    // }
}
exports.mvcArea = mvcArea;
