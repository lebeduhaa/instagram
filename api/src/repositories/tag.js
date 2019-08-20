const { Op } = require('sequelize');
const Tag = require('../models/tag');

class TagRepository {
    getTagsByIds(ids) {
        return Tag.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });
    }

    getAll() {
        return Tag.findAll();
    }

    create(tag) {
        return Tag.create(tag);
    }

    update(id, tag) {
        return Tag.update(tag, {
            where: { id }
        });
    }

    delete(id) {
        return Tag.destroy({ where: { id } });
    }
}

module.exports = new TagRepository();
