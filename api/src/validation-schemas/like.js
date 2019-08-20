const Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        postId: Joi
            .number()
            .integer()
            .min(1)
            .required()
    });
