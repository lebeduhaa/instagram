const Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        userId: Joi
            .number()
            .min(1)
            .required()
    });
