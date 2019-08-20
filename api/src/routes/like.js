const router = require('express').Router();
const authenticated = require('../middlewares/authenticated');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');
const requestWrapper = require('../middlewares/request-wrapper');
const LikeController = require('../controllers/like');

router
    .use(authenticated);

router.post(
    '/:postId',
    validator({ params: validationSchemas.like }),
    requestWrapper(LikeController.putLike)
);
router.delete(
    '/:postId',
    validator({ params: validationSchemas.like }),
    requestWrapper(LikeController.removeLike)
);
router.get(
    '/:postId',
    validator({ params: validationSchemas.like }),
    requestWrapper(LikeController.getPostLikes)
);

module.exports = router;
