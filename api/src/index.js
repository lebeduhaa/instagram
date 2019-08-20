const database = require('./database');
const server = require('./server');
const initModels = require('./models');
const Rabbit = require('./classes/rabbit');
const constants = require('./constants');
const config = require('./config');

Rabbit.connect()
    .then(async () => {
        try {
            await database.connect();
            initModels();
            server.run();
        } catch (exception) {
            Rabbit.sendToQueue(config.rabbitMQ.logsQueue, {
                logType: constants.logTypes.error,
                content: exception
            });
        }
    });
