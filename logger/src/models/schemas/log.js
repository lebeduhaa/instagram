const { Schema } = require('mongoose');

module.exports = new Schema({
    content: {
        type: String,
        required: [true, 'Your log should have a content!']
    },
    date: {
        type: Date,
        required: [true, 'Your log should have a date!']
    }
});
