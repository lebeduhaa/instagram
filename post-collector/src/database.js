const Sequelize = require('sequelize');
const config = require('./config');
const Rabbit = require('./classes/rabbit');
const constants = require('./constants');

const sequelize = new Sequelize(config.name, config.dialect, config.password, {
    host: config.host,
    dialect: config.dialect,
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
            Rabbit.sendToLogsQueue({
                logType: constants.logTypes.info,
                content: 'Database was connected!'
            });
            sequelize
                .sync()
                .then(() => {
                    Rabbit.sendToLogsQueue({
                        logType: constants.logTypes.info,
                        content: 'Database synchronized successfully!'
                    });
                    resolve();
                })
                .catch(error => reject(error));
        })
        .catch(error => reject(error));
});
