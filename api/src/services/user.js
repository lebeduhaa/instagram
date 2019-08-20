const UserRepository = require('../repositories/user');
const NotFoundError = require('../classes/errors/not-found');
const UnauthorizedAccessError = require('../classes//errors/unauthorized-access');
const constants = require('../constants');
const Rabbit = require('../classes/rabbit');
const config = require('../config');

class UserService {
    async create(user) {
        return await UserRepository.create(user);
    }

    async getAll(userId, options) {
        return await UserRepository.getAll(userId, options);
    }

    async archiveUser(userId) {
        const user = await UserRepository.get({ id: userId });

        if (user.status !== constants.user.statuses.requested) {
            throw new UnauthorizedAccessError('You can delete only that users who sent request!');
        }

        user.update({ status: 'deleted' });

        if (!user) {
            throw new NotFoundError('User does not exists!');
        }

        Rabbit.sendToQueue(config.rabbitMQ.emailsQueue, {
            text: 'Ваш запрос на удаление учётной записи был обработан. Учётная запись удалена успешно.',
            receiver: user.email
        });

        return user;
    }

    async updateUser(currentUser, user) {
        return await currentUser.update(user);
    }
}

module.exports = new UserService();
