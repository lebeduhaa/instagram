const helpers = require('../helpers');
const TagRepository = require('../repositories/tag');
const PostRepository = require('../repositories/post');
const NotFoundError = require('../classes/errors/not-found');

class PostService {
    async deletePost(user, postId) {
        const post = (await user.getPosts({where: {id: postId}}))[0];

        if (!post) {
            throw new NotFoundError('User does not have this post!');
        }

        await post.destroy();

        return null;
    }

    async createPost(user, postData, file) {
        const post = { text: postData.text };

        post.createdAt = new Date();

        if (file) {
            post.picture = post.createdAt.valueOf() + file.originalFilename;

            await helpers.copyFile(file.path, `${__dirname}/../../uploads/${post.picture}`);
            await helpers.deleteFile(file.path);
        }

        const createdPost = await user.createPost(post);

        if (postData.tags) {
            const tags =  await TagRepository.getTagsByIds(JSON.parse(postData.tags));
            await createdPost.setTags(tags);
        }

        return createdPost;
    }

    async updatePost(user, updatedPost) {
        const post = await PostRepository.get(updatedPost.id);

        if (!post) {
            throw new NotFoundError('Post does not exist!');
        }

        await post.removeTags(await post.getTags());
        await post.setTags(updatedPost.tags.map(tag => tag.id));

        return await post.update(updatedPost);
    }

    async getPosts(query) {
        const { pagination, options } = helpers.splitPaginationFromQuery(query);
        const { tags } = helpers.splitOptionsAndCertainField(options, 'tags');

        return await PostRepository.getAll(pagination, options, tags);
    }
}

module.exports = new PostService();
