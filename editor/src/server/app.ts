import Koa = require("koa");
// const KoaRouter = require('koa-router');
const views = require('koa-views');

const app:Koa = new Koa();
// const router = new KoaRouter();

app.use(views(__dirname + '/views', {
    map: {pug: 'pug'},
    extension: 'pug'
}));

app.use(async(ctx:Koa.Context, next:Function) => {
    await ctx.render('user/profile');
});

app.listen(3010);