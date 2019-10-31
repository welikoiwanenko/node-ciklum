const LIVR = require('livr');
const db   = require('../db');

const itemsController = {
    getItems(ctx, next) {
        console.log(ctx.headers);
        const items = db.getItems();
        ctx.body = items;
    },
    createItem(ctx, next) {
        if (ctx.headers.authorization === 'admin') {
            db.writeItem(ctx.request.body);
            ctx.body = 'created item';
        } else {
            ctx.status = 401;
            ctx.body = 'you are not allowed';
        }
    },
    deleteItem(ctx, next) {
        db.deleteItem(Number(ctx.params.itemId));
        ctx.status = 204;
        ctx.body = '';
    },
    updateItem(ctx) {
        const validator = new LIVR.Validator({
            itemId: [ 'required', 'positive_integer' ]
        });
        
        const isValid = validator.validate({
            itemId: ctx.params.itemId
        });

        if (!isValid) {
            ctx.body = validator.getErrors();
            ctx.status = 400;
            return;
        }

        const updatedItem = db.updateItem(
            Number(ctx.params.itemId),
            ctx.request.body
        );

        if (updatedItem) {
            ctx.body = updatedItem;
        } else {
            ctx.status = 404;
        }
    }
};

module.exports = itemsController;
