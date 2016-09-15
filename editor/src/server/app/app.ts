import Koa = require('koa');
import {Mvc} from "../koa-mvc-server/Mvc";
import mount = require('koa-mount');
const serveStatic = require('koa-static');

const app: Koa = new Koa();
app.use(serveStatic( '.www'));

const jspm: Koa = new Koa();
jspm.use(serveStatic('jspm_packages'));
app.use(mount('/jspm_packages', jspm));

var mvc = new Mvc();
mvc.registerAreas(__dirname, ['/admin', '/home'], {
    views: {
        extension: 'pug',
        engine: 'pug'
    }
});
app.use(mvc.routes());

app.listen(3010);