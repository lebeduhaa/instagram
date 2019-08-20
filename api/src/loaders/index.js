const initExpress = require('./express');
const initRoutes = require('./routes');
const initMiddlewares = require('./middlewares');
const initSessions = require('./sessions');
const logger = require('../middlewares/logger');

module.exports = (expressApp) => {
    initExpress(expressApp);
    initSessions(expressApp);
    expressApp
        .use(logger);
    initRoutes(expressApp);
    initMiddlewares(expressApp);
};
