const Logger = require('./classes/logger');
const database = require('./database');
const Rabbit = require('./classes/rabbit');

Logger.init();
database.connect()
    .then((connection) => {
        Logger.logInfo(`Connected to ${connection.host}:${connection.port}/${connection.name}`);
        Rabbit.run();
    })
    .catch((error) => {
        Logger.logError(error);
    });
