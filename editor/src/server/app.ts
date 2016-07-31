import Koa = require("koa");
const KoaRouter = require('koa-router');

const app:Koa = new Koa();
const router = new KoaRouter();

app.use((ctx:Koa.Context, next:Function)=> {
    ctx.body = 'Hello';
});

app.listen(3010);