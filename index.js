const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const lib = require('./module');

const app = new Koa();
const router = new Router();

router
.get('/', (ctx, next) => {
    console.log(ctx)
    ctx.body = 'Hello World';
})
.post('/users', async (ctx, next) => {
    ctx.body = lib.greetings(ctx.request.body.name);
})

app
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
