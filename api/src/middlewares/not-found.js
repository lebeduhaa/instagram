const NotFoundError = require('../classes/errors/not-found');

module.exports = (request, response) => {
    throw new NotFoundError('Router not found, incorrect request URL!');
};
