const mongoose = require('mongoose');
const logSchema = require('./schemas/log');

module.exports = mongoose.model('info', logSchema);
