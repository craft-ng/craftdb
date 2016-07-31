"use strict";
var Koa = require("koa");
var KoaRouter = require('koa-router');
var app = new Koa();
var router = new KoaRouter();
app.use(function (ctx, next) {
    ctx.body = 'Hello';
});
app.listen(3010);
