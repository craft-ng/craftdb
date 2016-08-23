import Koa = require('koa');
import mount = require('koa-mount')
import {UserController} from './admin/controllers/user';
const KoaRouter = require('koa-router');
const views = require('koa-views');
const serveStatic = require('koa-static');

const app: Koa = new Koa();
const router = new KoaRouter();

app.use(serveStatic('.www'));

router
    .get('/', async(ctx: Koa.Context, next: Function)=> {
        // await next();
        await ctx.render('user/profile');
    })
    .get('/about', async(ctx: Koa.Context, next: Function)=> {
        // await next();
        ctx.body = 'About info comes here...';
    });

app.use(views(__dirname + '/views', {
    map: {pug: 'pug'},
    extension: 'pug'
}));

app.use(router.middleware());

const subApp: Koa = new Koa();
subApp.use(new UserController().getRouter().middleware());
app.use(mount('/user', subApp));

app.listen(3010);