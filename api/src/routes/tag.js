const router = require('express').Router();
const authenticated = require('../middlewares/authenticated');
const adminFeature = require('../middlewares/admin-feature');
const requestWrapper = require('../middlewares/request-wrapper');
const TagController = require('../controllers/tag');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

router
    .use(authenticated);

router.get(
    '/',
    requestWrapper(TagController.getTags)
);
router.post(
    '/',
    adminFeature,
    validator({ body: validationSchemas.tag }),
    requestWrapper(TagController.createTag)
);
router.put(
    '/:id',
    adminFeature,
    validator({ params: validationSchemas.id, body: validationSchemas.tag }),
    requestWrapper(TagController.updateTag)
);
router.delete(
    '/:id',
    adminFeature,
    validator({ params: validationSchemas.id  }),
    requestWrapper(TagController.deleteTag)
);

module.exports = router;
