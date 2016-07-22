//import * as Koa from 'koa';
"use strict";
var Koa = require("koa");
var app = new Koa();
app.use(function (ctx, next) {
    ctx.body = 'Hello';
});
app.listen(3010);
