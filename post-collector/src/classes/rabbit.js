const amqp = require('amqplib/callback_api');
const config = require('../config');

class Rabbit {
    sendToLogsQueue(message) {
        this._channel.sendToQueue(config.logsQueue, Buffer.from(JSON.stringify(message)));
    }

    run() {
        return new Promise((resolve, reject) => {
            amqp.connect(config.rabbitUrl, (error0, connection) => {
                if (error0) {
                    reject(error0);
                }

                connection.createChannel((error1, channel) => {
                    if (error1) {
                        reject(error1);
                    }

                    this._channel = channel;
                    channel.assertQueue(config.logsQueue, {
                        durable: true
                    });
                    resolve();
                });
            });
        });
    }
}

module.exports = new Rabbit();
