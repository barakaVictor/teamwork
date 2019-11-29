const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const UserController = require('../../src/controllers/usercontroller');

describe('UserController', () => {
  let UserModel;
  let response;
  let next;
  let userController;

  beforeEach(() => {
    UserModel = function CreateUserModel() {
      return {
        async save() {
          return Promise.resolve(true);
        },
        async signin() {
          const dbresponse = {
            token: 'random',
            userId: '1',
          };

          return Promise.resolve(dbresponse);
        },
      };
    };

    response = mockResponse();
    next = mockNext();
    userController = new UserController(UserModel);
  });

  it('createUser method returns 201 success response code on successful user creation', (done) => {
    const request = mockRequest({
      body: {
        firstName: 'test',
        lastName: 'test',
        email: 'test@example.com',
        password: 'test',
        gender: 'male',
        jobRole: 'Developer',
        department: 'IT',
        address: '00018-Downing Street',
      },
    });

    userController.createUser(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 201);
        done();
      })
      .catch((error) => done(error));
  });

  it('signin method returs 200 response code and an authentication token on successful signin', (done) => {
    const request = mockRequest({
      email: 'test@example.com',
      password: 'random,',
    });

    userController.signin(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        assert('token' in resp.json.args[0][0].data);
        assert('userId' in resp.json.args[0][0].data);
        done();
      }).catch((error) => done(error));
  });
});
