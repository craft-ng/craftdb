import Koa = require("koa");

export type KoaMiddleware = (ctx: Koa.Context, next: () => Promise<any>) => any;
export type KoaMiddlewareFactory = ()=>KoaMiddleware;