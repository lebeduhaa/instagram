
const cookieParser = require('cookie-parser');
const express = require('../../node_modules/express');

module.exports = (expressApp) => {
    expressApp
        .use(cookieParser())
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use('/uploads', express.static('uploads'));
};
