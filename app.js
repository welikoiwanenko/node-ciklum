const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const initRoutes = require('./src/routes');

const DB = require('./src/initializers/db');

const app = new Koa();
const router = new Router();

initRoutes(router);
const db = new DB();

// TODO: remove it
db.getItems()
.then(items => {
    console.log(items);
    return db.createItem({ price: 100, name: 'Something' });
})
.then(id => {
    console.log(id);
    return Promise.all([ db.getItems(), id ]);
})
.then(([ items, id ]) => {
    console.log(items);
    return db.deleteItem(id);
})
.then(() => {
    return db.getItems();
})
.then(items => {
    console.log(items);
});

app
.use(bodyparser())
.use(router.routes())
.use(router.allowedMethods());

module.exports = app.listen(3000, () => {
    console.log('Server started');
});
