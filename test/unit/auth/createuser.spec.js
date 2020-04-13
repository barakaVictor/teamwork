const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const UserController = require('../../../src/controllers/usercontroller');

describe('UserController.createUser', () => {
  let request;
  let response;
  let next;
  let userController;
  let userModel;
  beforeEach(() => {
    response = mockResponse();
    next = mockNext();
    userModel = function UserModel() {
      return {
        save: async (data) => Promise.resolve(data),
      };
    };
    userController = new UserController(userModel);
  });

  it('Returns 201 success response code on successful user creation', (done) => {
    request = mockRequest({
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

  it('Calls next when an error is encountered', (done) => {
    userModel = function UserModel() {
      return {
        save: () => Promise.reject('Something failed'),
      };
    };
    userController = new UserController(userModel);
    userController.createUser(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
