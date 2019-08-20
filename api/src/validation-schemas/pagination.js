const Joi = require('joi');

module.exports = Joi
    .object()
    .unknown(true)
    .keys({
        page: Joi
            .number()
            .min(1)
            .required(),
        size: Joi
            .number()
            .min(1)
            .required()
    });
