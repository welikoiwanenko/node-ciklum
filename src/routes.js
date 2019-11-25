const LIVR = require('livr');
const itemsController = require('./controllers/items');

const validationRules = {
    '/items/:itemId': {
        PUT: {
            params: {
                itemId: [ 'required', 'positive_integer' ]
            },
            body: {
                text: [ 'required', 'string' ],
                a: [ 'required', 'positive_integer' ]
            }
        }
    }
}

function initRoutes(router) {
    router.get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, World!';
    });

    router.get('/items', itemsController.getItems);
    router.post('/items', itemsController.createItem);
    router.delete('/items/:itemId', itemsController.deleteItem);
    router.put('/items/:itemId', async (ctx, next) => {
        const validation = validationRules[ctx._matchedRoute][ctx.request.method];
        if (validation.params) {
            const validator = new LIVR.Validator(validation.params);

            const result = validator.validate({
                ...ctx.params
            });

            if (!result) {
                ctx.body = validator.getErrors();
                ctx.status = 400;
                return;
            } else {
                ctx.params = result;
            }
        }
        if (validation.body) {
            const validator = new LIVR.Validator(validation.body);

            const result = validator.validate({
                ...ctx.request.body
            });

            if (!result) {
                ctx.body = validator.getErrors();
                ctx.status = 400;
                return;
            } else {
                ctx.params = result;
            }
        }

        console.log('1');
        await next();
    }, itemsController.updateItem);
}

module.exports = initRoutes;
