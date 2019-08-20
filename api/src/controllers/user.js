const UserService = require('../services/user');

class UserController {
    async getAll(request, response) {
        const { id } = request.user;


        response.send(await UserService.getAll(id, request.query));
    }

    async deleteUser(request, response) {
        const { id } = request.params;

        await UserService.archiveUser(id);
        response
            .status(204)
            .end();
    }

    async updateUser(request, response) {
        response.send(await UserService.updateUser(request.user, request.body));
    }
}

module.exports = new UserController();
