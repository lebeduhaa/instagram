const Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        firstName: Joi
            .string()
            .min(1)
            .max(20)
            .optional(),
        lastName: Joi
            .string()
            .min(1)
            .max(20)
            .optional(),
        status: Joi
            .string()
            .min(1)
            .max(20)
            .optional()
    });
