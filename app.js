const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const initRoutes = require('./src/routes');
const DB = require('./src/initializers/db');

const app = new Koa();
const router = new Router();

initRoutes(router);
app.db = new DB();

app
.use(bodyparser())
.use(router.routes())
.use(router.allowedMethods());

module.exports = app.listen(3000, (err) => {
    if (err) {
        console.log(`Server crashed: ${JSON.stringify(err, null, 4)}`);
    } else {
        console.log('Server started');
    }
});
