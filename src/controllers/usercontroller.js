const { authenticate, generateAuthToken, hashpassword } = require('../utils/auth');

class UserController {
  constructor(UserModel) {
    this.userModel = new UserModel();
    this.createUser = this.createUser.bind(this);
    this.signin = this.signin.bind(this);
  }

  async createUser(request, response, next) {
    return hashpassword(request.body.password, 10)
      .then((hash) => {
        request.body.password = hash;
        return this.userModel.save(request.body)
          .then((userId) => response
            .status(201)
            .json({
              status: 'success',
              data: {
                message: 'User account successfully created',
                token: 'random',
                userId,
              },
            }))
          .catch((error) => next(error));
      }).catch((error) => next(error));
  }

  async signin(request, response, next) {
    const { email, password } = request.body;
    return this.userModel.find(email)
      .then((user) => {
        if (!user) {
          return response.status(404).json({
            status: 'error',
            error: 'User not found',
          });
        }
        return authenticate(password, user.password)
          .then((valid) => {
            if (!valid) {
              return response.status(401).json({
                status: 'error',
                error: 'Invalid credentials provided',
              });
            }
            return generateAuthToken(user)
              .then((token) => response.status(200).json({
                status: 'success',
                data: {
                  token,
                  userId: user.id,
                },
              })).catch((error) => next(error));
          }).catch((error) => next(error));
      }).catch((error) => next(error));
  }
}

module.exports = UserController;
