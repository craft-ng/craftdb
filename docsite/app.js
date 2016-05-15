const Koa = require('koa');
const app = new Koa();

app.use(function*(){
    console.log('Processing request');
    this.body = 'Hello World';‌‌
});

app.listen(3000);
