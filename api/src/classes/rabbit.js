const amqp = require('amqplib/callback_api');
const config = require('../config');

class RabbitMQ {
    connect() {
        return new Promise((resolve, reject) => {
            amqp.connect(config.rabbitMQ.url, (error0, connection) => {
                if (error0) {
                    console.log(error0);
                    reject(error0);
                }

                connection.createChannel((error1, channel) => {
                    if (error1) {
                        reject(error1);
                    }

                    this._channel = channel;
                    channel.assertQueue(config.rabbitMQ.emailsQueue, {
                        durable: true
                    });
                    channel.assertQueue(config.rabbitMQ.logsQueue, {
                        durable: true
                    });
                    resolve();
                });
            });
        });
    }

    sendToQueue(queueName, message) {
        this._channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    }
}

module.exports = new RabbitMQ();
