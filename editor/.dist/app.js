"use strict";
// import * as Koa from 'koa';
var Koa = require("koa");
// import Koa = require("koa");
var app = new Koa();
app.use(function (ctx, next) {
    ctx.body = 'Hello';
});
app.listen(3010);
