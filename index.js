const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const initRoutes = require('./src/routes');

const app = new Koa();
const router = new Router();

initRoutes(router);
app
.use(bodyparser())
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000);
