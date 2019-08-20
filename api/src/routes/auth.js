const router = require('express').Router();
const passport = require('passport');
const AuthController = require('../controllers/auth');
const validator = require('../middlewares/validator')
const requestWrapper = require('../middlewares/request-wrapper');
const validationSchemas = require('../validation-schemas');
const authenticated = require('../middlewares/authenticated');

router.post(
    '/register',
    validator({ body: validationSchemas.userData }),
    requestWrapper(AuthController.register)
);
router.post(
    '/login',
    validator({ body: validationSchemas.userCredentials }),
    passport.authenticate('local'),
    requestWrapper(AuthController.login)
);
router.get(
    '/logout',
    authenticated,
    requestWrapper(AuthController.logout)
);

module.exports = router;
