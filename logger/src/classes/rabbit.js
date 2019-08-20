const amqp = require('amqplib/callback_api');
const config = require('../config');
const constants = require('../constants');
const Logger = require('./logger');

exports.run = () => {
    amqp.connect(config.rabbitUrl, (error0, connection) => {
        if (error0) {
            throw new Error(error0);
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw new Error(error1);
            }

            channel.assertQueue(config.emailQueue, {
                durable: true
            });

            channel.assertQueue(config.logsQueue, {
                durable: true
            });

            Logger.logInfo('Logger is waiting for messages...');
            channel.consume(config.logsQueue, async (message) => {
                const { logType, content } = JSON.parse(message.content.toString());

                switch (logType) {
                    case constants.logTypes.error:
                        Logger.logError(content);
                        break;
                    case constants.logTypes.info:
                        Logger.logInfo(content);
                        break;
                    default:
                        Logger.logError('Unknown type of log!');
                }
            }, {
                noAck: true
            });
        });
    });
};
