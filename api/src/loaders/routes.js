const authRoute = require('../routes/auth');
const userRoute = require('../routes/user');
const postRoute = require('../routes/post');
const tagRoute = require('../routes/tag');
const likeRoute = require('../routes/like');


module.exports = (expressApp) => {
    expressApp
        .use(authRoute)
        .use('/users', userRoute)
        .use('/posts', postRoute)
        .use('/tags', tagRoute)
        .use('/likes', likeRoute);
};
