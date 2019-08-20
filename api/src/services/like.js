const PostRepository = require('../repositories/post');
const NotFoundError = require('../classes/errors/not-found');
const User = require('../models/user');

class LikeService {
    async putLike(user, postId) {
        const post = await PostRepository.get(postId);

        if (!post) {
            throw new NotFoundError('User does not have this post!');
        }

        return await post.createLike({userId: user.id});
    }

    async removeLike(user, postId) {
        const post = await PostRepository.get(postId);

        if (!post) {
            throw new NotFoundError('User does not have this post!');
        }

        const like = (await post.getLikes({where: {userId: user.id}}))[0];

        await like.destroy();

        return null;
    }

    async getPostLikes(postId) {
        const post = await PostRepository.get(postId);

        if (!post) {
            throw new NotFoundError('Post does not exists!');
        }

        const likes = await post.getLikes({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ]
        });
        const users = likes.map(row => row.user);

        return users;
    }
}

module.exports = new LikeService();
