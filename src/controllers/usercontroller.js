class UserController {
  constructor(UserModel) {
    this.model = new UserModel();
    this.createUser = this.createUser.bind(this);
    this.signin = this.signin.bind(this);
  }

  async createUser(request, response, next) {
    return this.model.save(request.body)
      .then((userId) => response
        .status(201)
        .json({
          status: 'success',
          data: {
            message: 'User account successfully created',
            token: 'random',
            userId,
          },
        })).catch((error) => next(error));
  }

  async signin(request, response, next) {
    return this.model.signin(request.body)
      .then((data) => response
        .status(200)
        .json({
          status: 'success',
          data: {
            token: data.token,
            userId: data.userId,
          },
        })).catch((error) => next(error));
  }
}

module.exports = UserController;
