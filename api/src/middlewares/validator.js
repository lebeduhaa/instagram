const Joi = require('joi');
const UnprocessableEntityError = require('../classes/errors/unprocessable-entity');

const validate = (object, schema) => {
    if (schema) {
        const validationResult = Joi.validate(object, schema);

        if (validationResult.error) {
            throw new UnprocessableEntityError(`Unprocessable entity! ${validationResult.error.details[0].message}!`);
        }
    }
};

module.exports = validationOptions => (request, response, next) => {
    validate(request.body, validationOptions.body);
    validate(request.query, validationOptions.query);
    validate(request.params, validationOptions.params);
    next();
};
