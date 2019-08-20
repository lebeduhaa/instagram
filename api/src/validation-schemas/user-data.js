const Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        firstName: Joi
            .string()
            .min(1)
            .max(20)
            .required(),
        lastName: Joi
            .string()
            .min(1)
            .max(20)
            .required(),
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .min(3)
            .max(20)
            .required()
    });
