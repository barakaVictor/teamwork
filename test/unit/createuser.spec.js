const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const UserController = require('../../src/controllers/usercontroller');

describe('UserController.createUser', () => {
  it('Returns 201 success response code on successful user creation', (done) => {
    function UserModel() {
      return {
        async save() {
          return Promise.resolve(true);
        },
      };
    }

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

    const response = mockResponse();
    const next = mockNext();
    const userController = new UserController(UserModel);

    userController.createUser(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 201);
        done();
      })
      .catch((error) => done(error));
  });
});
