const amqp = require('amqplib/callback_api');
const config = require('../config');
const Mailer = require('../classes/mailer');
const constants = require('../constants');

class Rabbit {
    sendToLogsQueue(message) {
        this._channel.sendToQueue(config.logsQueue, Buffer.from(JSON.stringify(message)));
    }

    run() {
        amqp.connect(config.rabbitUrl, (error0, connection) => {
            if (error0) {
                throw new Error(error0);
            }

            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw new Error(error1);
                }

                this._channel = channel;
                this._initQueues();
                this.sendToLogsQueue({
                    logType: constants.logTypes.info,
                    content: 'Mailer service is waiting for messages...'
                });
                this._listenEmailsQueue();
            });
        });
    }

    _initQueues() {
        this._channel.assertQueue(config.emailQueue, {
            durable: true
        });
        this._channel.assertQueue(config.logsQueue, {
            durable: true
        });
    }

    _listenEmailsQueue() {
        this._channel.consume(config.emailQueue, async (message) => {
            const { receiver, text } = JSON.parse(message.content.toString());
            try {
                const result = await Mailer.sendMessage(text, receiver);

                this.sendToLogsQueue({
                    logType: constants.logTypes.info,
                    content: `Message was sent successfully! ${JSON.stringify(result)}`
                });
            } catch (exception) {
                this.sendToLogsQueue({
                    logType: constants.logTypes.error,
                    content: `Mailer has exception! ${exception}`
                });
            }
        }, {
            noAck: true
        });
    }
}

module.exports = new Rabbit();
