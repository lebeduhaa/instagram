const errorHandler = require('../middlewares/error-handler');
const notFound = require('../middlewares/not-found');

module.exports = (expressApp) => {
    expressApp
        .use(notFound)
        .use(errorHandler);
};
