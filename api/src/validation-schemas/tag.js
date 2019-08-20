const Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        title: Joi
            .string()
            .min(1)
            .max(1000)
            .invalid(['undefined'])
            .required()
    });
