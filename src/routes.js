const itemsController = require('./controllers/items');

const validationRules = {
    '/items/:itemId': {
        PUT: {
            params: {
                itemId: [ 'required', 'positive_integer' ]
            }
        }
    }
};

const validationMiddleware = require('./middlewares/validator')(validationRules);

function initRoutes(router) {
    router.get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, World!';
    });

    router.get('/items', validationMiddleware, itemsController.getItems);
    router.post('/items', validationMiddleware, itemsController.createItem);
    router.delete('/items/:itemId', validationMiddleware, itemsController.deleteItem);
    router.put('/items/:itemId', validationMiddleware, itemsController.updateItem);
}

module.exports = initRoutes;
