const TagService = require('../services/tag');

class TagController {
    async getTags(request, response) {
        response.send(await TagService.getTags());
    }

    async createTag(request, response) {
        response.send(await TagService.createTag(request.body));
    }

    async updateTag(request, response) {
        const { id } = request.params;

        await TagService.updateTag(id, request.body);
        response
            .status(204)
            .end();
    }

    async deleteTag(request, response) {
        const { id } = request.params;

        await TagService.deleteTag(id);
        response
            .status(204)
            .end();
    }
}

module.exports = new TagController();
