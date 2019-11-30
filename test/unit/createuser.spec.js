const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const { UserModel } = require('../testutils/mockmodels');

const UserController = require('../../src/controllers/usercontroller');

describe('UserController.createUser', () => {
  let response;
  let userController;

  beforeEach(() => {
    response = mockResponse();
    userController = new UserController(UserModel);
  });

  it('Returns 201 success response code on successful user creation', (done) => {
    const request = mockRequest({
      body: {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        email: 'test@example.com',
        password: 'test',
        gender: 'male',
        jobRole: 'Developer',
        department: 'IT',
        address: '00018-Downing Street',
      }
      ,
    });

    userController.createUser(request, response, mockNext)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 201);
        done();
      })
      .catch((error) => done(error));
  });
});
