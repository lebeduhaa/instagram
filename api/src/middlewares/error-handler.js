const Rabbit = require('../classes/rabbit');
const constants = require('../constants');
const config = require('../config');

module.exports = (error, request, response, next) => {
    Rabbit.sendToQueue(config.rabbitMQ.logsQueue, {
        logType: constants.logTypes.error,
        content: `Something happened! ${error.message} Stack : ${error.stack}`
    });
    response
        .status(error.status ? error.status : 500)
        .send(error.message);
};
