const router = require('express').Router();
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');
const authenticated = require('../middlewares/authenticated');
const requestWrapper = require('../middlewares/request-wrapper');
const PostController = require('../controllers/post');
const prepareFileUpload = require('../middlewares/prepare-file-upload');

router
    .use(authenticated);

router.post(
    '/',
    prepareFileUpload,
    validator({ body: validationSchemas.post  }),
    requestWrapper(PostController.createPost)
);
router.get(
    '/',
    validator({ query: validationSchemas.pagination }),
    requestWrapper(PostController.getPosts)
);
router.delete(
    '/:id',
    validator({ params: validationSchemas.id  }),
    requestWrapper(PostController.deletePost)
);
router.put(
    '/',
    requestWrapper(PostController.updatePost)
);

module.exports = router;
