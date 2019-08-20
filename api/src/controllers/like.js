const LikeService = require('../services/like');

class LikeController {
    async putLike(request, response) {
        const { postId } = request.params;

        response.send(await LikeService.putLike(request.user, postId));
    }

    async removeLike(request, response) {
        const { postId } = request.params;

        await LikeService.removeLike(request.user, postId);
        response
            .status(204)
            .end();
    }

    async getPostLikes(request, response) {
        const { postId } = request.params;

        response.send(await LikeService.getPostLikes(postId));
    }
}

module.exports = new LikeController();
