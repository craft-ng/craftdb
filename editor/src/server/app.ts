import Koa = require("koa");
// const KoaRouter = require('koa-router');
const views = require('koa-views');
;
const consolidate = require('consolidate');

const app:Koa = new Koa();
// const router = new KoaRouter();

app.use(views(__dirname + '/views', {
    map: {pug: 'pug'},
    extension: 'pug'
}));

// app.use(views('/home/pbalaga/Projects/craft/editor/.dist'));

app.use(async function(ctx:Koa.Context, next:Function) {
    //ctx.body = 'Hello';
    // var c = consolidate['pug']('/home/pbalaga/Projects/craft/editor/.dist/views/layout.pug').then(html=>
    //     console.log(html));
    await ctx.render('user/profile');
});

console.log(__dirname);
app.listen(3010);