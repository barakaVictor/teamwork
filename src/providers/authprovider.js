const UserModel = require('../models/user');
const UserController = require('../controllers/usercontroller')
const AuthRoutes = require('../routes/api/v1/auth')
const AuthMiddleware = require('../utils/auth')();

const UserValidator = require('../utils/validators/uservalidator')


module.exports = (c) => {
    c.service('UserModel', (c) => new UserModel(c.db));
    c.service('AuthMiddleware', (c) => AuthMiddleware);
    c.service('UserController', (c)=> new UserController(c.UserModel, c.AuthMiddleware));
    c.service('UserValidator', (c) => UserValidator(c.UserModel))
    c.service('AuthRoutes', (c) => AuthRoutes(c.UserValidator, c.UserController) )

}