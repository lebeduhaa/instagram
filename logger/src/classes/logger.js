const winston = require('winston');
const ErrorLog = require('../models/error');
const InfoLog = require('../models/info');

class Logger {
    init() {
        this._logger = winston.createLogger({
            transports: [
                new winston.transports.Console()
            ]
        });
    }

    logInfo(message) {
        this._logger.info(message);
        InfoLog.create({
            content: message,
            date: new Date()
        });
    }

    logError(message) {
        this._logger.error(message);
        ErrorLog.create({
            content: message,
            date: new Date()
        });
    }
}

module.exports = new Logger();
