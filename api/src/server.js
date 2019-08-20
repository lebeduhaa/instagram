const app = require('express')();
const initApp = require('./loaders');
const config = require('./config');
const Rabbit = require('./classes/rabbit');
const constants = require('./constants');

exports.run = () => {
    initApp(app);
    app.listen(config.server.port, () => Rabbit.sendToQueue(config.rabbitMQ.logsQueue, {
        logType: constants.logTypes.info,
        content: `Server run on the port ${config.server.port}`
    }));
};
