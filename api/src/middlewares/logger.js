const Rabbit = require('../classes/rabbit');
const constants = require('../constants');
const config = require('../config');

module.exports = (request, response, next) => {
    Rabbit.sendToQueue(config.rabbitMQ.logsQueue, {
        logType: constants.logTypes.info,
        content: `Was sent request! host: ${request.host}, method: ${request.method}, url: ${request.url}, body: ${JSON.stringify(request.body)}, params: ${JSON.stringify(request.params)}, queryParams: ${JSON.stringify(request.query)}!`
    });
    next();
};
