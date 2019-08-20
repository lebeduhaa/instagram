const TagRepository = require('../repositories/tag');

class TagService {
    async getTags() {
        return await TagRepository.getAll();
    }

    async createTag(tag) {
        return await TagRepository.create(tag);
    }

    async updateTag(id, tag) {
        return await TagRepository.update(id, tag);
    }

    async deleteTag(id) {
        return await TagRepository.delete(id);
    }
}

module.exports = new TagService();
