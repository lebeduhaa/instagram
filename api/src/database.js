const Sequelize = require('sequelize');
const config = require('./config');
const Rabbit = require('./classes/rabbit');
const constants = require('./constants');

const sequelize = new Sequelize(config.database.name, config.database.dialect, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect,
    define: {
        timestamps: false,
        underscored: true
    },
    logging: false
});

exports.sequelize = sequelize;

exports.connect = () => new Promise((resolve, reject) => {
    sequelize
        .authenticate()
        .then(() => {
            Rabbit.sendToQueue(config.rabbitMQ.logsQueue, {
                logType: constants.logTypes.info,
                content: 'Database was connected!'
            });

            sequelize
                .sync()
                .then(() => {
                    Rabbit.sendToQueue(config.rabbitMQ.logsQueue, {
                        logType: constants.logTypes.info,
                        content: 'Database synchronized successfully!'
                    });
                    resolve();
                })
                .catch(error => reject(error));
        })
        .catch(error => reject(error));
});
