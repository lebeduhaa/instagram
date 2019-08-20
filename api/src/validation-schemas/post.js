const Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        text: Joi
            .string()
            .min(1)
            .max(1000)
            .invalid(['undefined'])
            .required(),
        tags: Joi
            .optional()
    });
