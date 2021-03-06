const authutils = require('../utils/auth')

const BaseController = require('./base')
class AuthController extends BaseController {
  constructor(model, middleware) {
    super(model, middleware)
    this.register = this.register.bind(this);
    this.signin = this.signin.bind(this);
  }

  async register(request, response, next) {
    return authutils.hashpassword(request.body.password, 10)
      .then((hash) => {
        request.body.password = hash;
        return this.model.save(request.body)
          .then((userId) => response
            .status(201)
            .json({
              status: 'success',
              data: {
                message: 'User account successfully created',
                userId,
              },
            }))
          .catch((error) => {
            throw error;
          });
      }).catch((error) => next(error));
  }

  async signin(request, response, next) {
    const { email, password } = request.body;
    return this.model.find(email)
      .then((user) => {
        if (!user) {
          return response.status(404).json({
            status: 'error',
            error: 'User not found',
          });
        }
        return authutils.authenticate(password, user.password)
          .then((valid) => {
            if (!valid) {
              return response.status(401).json({
                status: 'error',
                error: 'Invalid credentials provided',
              });
            }
            return authutils.generateAuthToken(user)
              .then((token) => response.status(200).json({
                status: 'success',
                data: {
                  token,
                  userId: user.id,
                  isAdmin: user.isadmin
                },
              })).catch((error) => {
                throw error;
              });
          }).catch((error) => {
            throw error;
          });
      }).catch((error) => next(error));
  }
}

module.exports = AuthController;
