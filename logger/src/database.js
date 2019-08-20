const mongoose = require('mongoose');
const config = require('./config');

exports.connect = () => new Promise((resolve, reject) => {
    mongoose.connection.on('open', () => resolve(mongoose.connections[0]));
    mongoose.connection.on('error', error => reject(error));

    mongoose.connect(config.databaseUrl, { useNewUrlParser: true });
});
