const AuthenticationError = require('../classes/errors/authentication');

module.exports = (request, response, next) => {
    if (request.isAuthenticated()) {
        next();
    } else {
        throw new AuthenticationError('You are not authenticated!');
    }
};
