const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('./repositories/user');
const constants = require('./constants');
const AuthenticationError = require('./classes/errors//authentication');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await UserRepository.get({ email });

    if (user) {
        if (user.status === constants.user.statuses.deleted) {
            return done(new AuthenticationError('Your account was deleted!'));
        } else
        if (await user.validPassword(password)) {
            return done(null, user);
        } else {
            return done(new AuthenticationError('Incorrect password!'));
        }
    } else {
        return done(new AuthenticationError('Incorrect email!'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserRepository.get({ id });

    done(null, user);
});

module.exports = passport;
