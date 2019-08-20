const cors = require('cors');
const session = require('express-session');
const passport = require('../passport');

module.exports = (expressApp) => {
    expressApp
        .use(session({
            secret: 'SECRET',
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 2 * 24 * 60 * 60 * 1000
            }
        }))
        .use(passport.initialize())
        .use(passport.session())
        .use(cors({
            origin: ['http://localhost:4200'],
            credentials: true
        }));
};
