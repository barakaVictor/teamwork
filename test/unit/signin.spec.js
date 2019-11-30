const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const mockdb = require('../testutils/mockdb');

const { UserModel } = require('../testutils/mockmodels');

const { hashpassword } = require('../../src/utils/auth');

const UserController = require('../../src/controllers/usercontroller');

describe('UserController.signin', () => {
  let userController;
  let response;
  beforeEach((done) => {
    mockdb.length = 0;
    response = mockResponse();
    userController = new UserController(UserModel);
    hashpassword('test', 10)
      .then((hash) => {
        mockdb.push({
          id: 1,
          firstName: 'test',
          lastName: 'test',
          email: 'test@example.com',
          password: hash,
          gender: 'male',
          jobRole: 'Developer',
          department: 'IT',
          address: '00018-Downing Street',
        });
        done();
      }).catch((error) => done(error));
  });

  it('Returns 401 unathorized when provided with invalid credentials', (done) => {
    const request = mockRequest({
      body: {
        email: 'test@example.com',
        password: 'invalid',
      },
    });

    userController.signin(request, response, mockNext)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 401);
        done();
      }).catch((error) => done(error));
  });

  it('Returns 404 not found when provided email is not associated with an account', (done) => {
    const request = mockRequest({
      body: {
        email: 'non-existent@test.com',
        password: 'secret',
      },
    });

    userController.signin(request, response, mockNext)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 404);
        done();
      }).catch((error) => done(error));
  });

  it('Returns 200 ok with jwt token when provided with valid credentials', (done) => {
    const request = mockRequest({
      body: {
        email: 'test@example.com',
        password: 'test',
      },
    });

    userController.signin(request, response, mockNext)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      }).catch((error) => done(error));
  });
});
