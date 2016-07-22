//import * as Koa from 'koa';

import Koa = require("koa");
const app = new Koa();

app.use((ctx:Koa.Context, next:Function)=> {
    ctx.body = 'Hello';
});

app.listen(3010);