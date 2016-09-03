import Koa = require('koa');
import {Mvc} from "../koa-mvc-server/Mvc";
const serveStatic = require('koa-static');

const app: Koa = new Koa();
app.use(serveStatic('.www'));

var mvc = new Mvc();
mvc.registerAreas(__dirname, ['/admin', '/home'], {
    views: {
        extension: 'pug',
        engine: 'pug'
    }
});
app.use(mvc.routes());

app.listen(3010);