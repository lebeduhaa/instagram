const router = require('express').Router();
const requestWrapper = require('../middlewares/request-wrapper');
const adminFeature = require('../middlewares/admin-feature');
const UserController = require('../controllers/user');
const authenticated = require('../middlewares/authenticated');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

router
    .use(authenticated);

router.get(
    '/',
    requestWrapper(UserController.getAll)
);
router.delete(
    '/:id',
    adminFeature,
    validator({ params: validationSchemas.id }),
    requestWrapper(UserController.deleteUser)
);
router.put(
    '/',
    validator({ body: validationSchemas.updateUser }),
    requestWrapper(UserController.updateUser)
);

module.exports = router;
