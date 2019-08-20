const { Op } = require('sequelize');
const User = require('../models/user');

class UserRepository {
    create(user) {
        return User.create(user);
    }

    get(options) {
        return User.findOne({ where: options });
    }

    getAll(userId, options) {
        return User.findAll({
            where: {
                id: {
                    [Op.ne]: userId
                },
                ...options
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'status']
        });
    }

    update(userId, options) {
        return User.update(options, { where: { id: userId } });
    }
}

module.exports = new UserRepository();
