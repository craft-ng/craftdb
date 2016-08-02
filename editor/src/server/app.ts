import Koa = require("koa");
const KoaRouter = require('koa-router');
const views = require('koa-views');

const app:Koa = new Koa();
const router = new KoaRouter();

router
    .get('/', async(ctx:Koa.Context, next:Function)=> {
        await ctx.render('user/profile');
    })
    .get('/users', async(ctx:Koa.Context, next:Function)=> {
        ctx.body = 'User list to show up here';
    });

app.use(views(__dirname + '/views', {
    map: {pug: 'pug'},
    extension: 'pug'
}));

app.use(router.routes());

app.listen(3010);