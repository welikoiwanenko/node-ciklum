const LIVR = require('livr');

const itemsController = {
    async getItems(ctx) {
        const items = await ctx.app.db.getItems();
        ctx.body = items;
    },
    async createItem(ctx) {
        if (ctx.headers.authorization === 'admin') {
            const id = await ctx.app.db.createItem(ctx.request.body);
            ctx.body = id;
        } else {
            ctx.status = 401;
            ctx.body = 'you are not allowed';
        }
    },
    async deleteItem(ctx) {
        await ctx.app.db.deleteItem(ctx.params.itemId);
        ctx.status = 204;
        ctx.body = '';
    },
    async updateItem(ctx) {
        const validator = new LIVR.Validator({
            itemId: [ 'required', 'string' ]
        });

        const isValid = validator.validate({
            itemId: ctx.params.itemId
        });

        if (!isValid) {
            ctx.body = validator.getErrors();
            ctx.status = 400;
            return;
        }

        const updatedItem = await ctx.app.db.updateItem(
            ctx.params.itemId,
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
