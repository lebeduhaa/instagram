const constants = require('../constants');
const UnauthorizedAccessError = require('../classes/errors/unauthorized-access');

module.exports = (request, response, next) => {
    if (request.user.role === constants.user.roles.admin) {
        next();
    } else {
        throw new UnauthorizedAccessError('Unauthorized access error!You have no rules for this action!');
    }
};
