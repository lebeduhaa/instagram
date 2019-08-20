const UserService = require('../services/user');
const AuthenticationError = require('../classes/errors/authentication');

class AuthController {
    async login(request, response) {
        response.send(request.user);
    }

    async register(request, response) {
        const user = await UserService.create(request.body);

        await request.login(user, (error) => {
            if (error) {
                throw new AuthenticationError(error);
            } else {
                response.send(user);
            }
        });
    }

    async logout(request, response) {
        request.logout();
        response
            .status(204)
            .end();
    }
}

module.exports = new AuthController();
