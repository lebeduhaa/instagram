const { Op } = require('sequelize');
const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');
const Tag = require('../models/tag');

class PostRepository {
    getAll(pagination, options, tags) {
        const offset = (pagination.page - 1) * pagination.size;
        const limit = pagination.size;
        const tagIds = (tags && tags.length !== 0) ? JSON.parse(tags) : null;
        const queryObject = {
            distinct: true,
            attributes: ['id', 'createdAt', 'picture', 'text', 'userId'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Like,
                    attributes: ['id'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName', 'email']
                        }
                    ]
                },
                {
                    model: Tag,
                    attributes: ['id', 'title'],
                    where: {
                        id: {
                            [Op.in]: tagIds
                        }
                    }
                }
            ],
            order: [['id', 'ASC']],
            limit,
            offset,
            where: options
        };

        if (!tagIds) {
            delete queryObject.include[2].where;
        }

        return Post.findAndCountAll(queryObject);
    }

    delete(id) {
      return Post.destroy({
        where: { id }
      });
    }
    
    get(id) {
      return Post.findByPk(id);
    }
}

module.exports = new PostRepository();
