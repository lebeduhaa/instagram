const multiparty = require('multiparty');
const InternalServerError = require('../classes/errors/internal-server');

module.exports = (request, response, next) => {
    const form = new multiparty.Form();

    form.parse(request, (error, fields, files) => {
        if (error) {
            next(new InternalServerError(`File was not loaded!${error}!`));
        }
        if (files.file) {
            request.file = files.file[0];
        }

        Object.keys(fields).forEach((key) => {
            if (key !== 'file') {
                request.body[key] = fields[key][0];
            }
        });
        next();
    });
};
