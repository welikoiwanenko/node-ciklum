const LIVR = require('livr');
const get = require('lodash/get');

module.exports = validationRules => {
    return async (ctx, next) => {
        const rules = get(validationRules, `${ctx._matchedRoute}.${ctx.request.method}`);

        if (rules && rules.params) {
            const validator = new LIVR.Validator(rules.params);

            const result = validator.validate({
                ...ctx.params
            });

            if (!result) {
                ctx.body = validator.getErrors();
                ctx.status = 400;
                return;
            }
        }

        if (rules && rules.body) {
            const validator = new LIVR.Validator(rules.body);

            const result = validator.validate({
                ...ctx.body
            });

            if (!result) {
                ctx.body = validator.getErrors();
                ctx.status = 400;
                return;
            }
        }

        await next();
    };
};
