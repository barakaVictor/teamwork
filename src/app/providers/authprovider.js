const UserModel = require('../../models/user');
const AuthController = require('../controllers/auth');
const AuthMiddleware = require('../middleware/auth')
const Validate = require('../middleware/validate');
const ValidationRules = require('../../validators/rules/uservalidator')
const AuthRoutes = require('../../routes/api/v1/auth')

module.exports = (c) => {
    c.service('UserModel', (c) => new UserModel(c.db));
    c.service('AuthMiddleware', (c) => AuthMiddleware(c.UserModel) )
    c.service('AuthController', (c) => new AuthController(c.UserModel))
    c.service('UserValidator', (c) => Validate(ValidationRules(c.UserModel)));
    c.service('AuthRoutes', (c) => AuthRoutes({
        middleware: [c.UserValidator],
        controller: c.AuthController
    }))
}