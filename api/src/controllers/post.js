const PostService = require('../services/post');

class PostController {
    async createPost(request, response) {
        response.send(await PostService.createPost(request.user, request.body, request.file));
    }

    async getPosts(request, response) {
        response.send(await PostService.getPosts(request.query));
    }

    async deletePost(request, response) {
        const { id } = request.params;

        await PostService.deletePost(request.user, id);
        response
            .status(204)
            .end();
    }

    async putLike(request, response) {
        response.send(await PostService.putLike(request.user, request.body));
    }

    async updatePost(request, response) {
        response.send(await PostService.updatePost(request.user, request.body));
    }
}

module.exports = new PostController();
