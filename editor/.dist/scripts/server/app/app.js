"use strict";
const Koa = require('koa');
const Mvc_1 = require("../koa-mvc-server/Mvc");
const serveStatic = require('koa-static');
const app = new Koa();
app.use(serveStatic('.www'));
var mvc = new Mvc_1.Mvc();
mvc.registerAreas(__dirname, ['/admin', '/home'], {
    views: {
        extension: 'pug',
        engine: 'pug'
    }
});
app.use(mvc.routes());
app.listen(3010);

//# sourceMappingURL=app.js.map
