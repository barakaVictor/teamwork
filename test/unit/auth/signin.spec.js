const assert = require('assert');

const sinon = require('sinon');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const authutils = require('../../../src/app/utils/auth')

const UserController = require('../../../src/app/controllers/auth');

describe('UserController.signin', () => {
  let userController;
  let request;
  let response;
  let next;
  let mockdb;
  let userModel;
  beforeEach((done) => {
    mockdb = [];
    response = mockResponse();
    next = mockNext();
    userModel = function UserModel() {
      return {
        save: async (data) => {
          mockdb.push(data);
          return Promise.resolve(data);
        },
        find: async (email) => {
          const user = mockdb.find((obj) => obj.email === email);
          return Promise.resolve(user);
        },
      };
    };
    authutils.hashpassword('test', 10)
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
    request = mockRequest({
      body: {
        email: 'test@example.com',
        password: 'invalid',
      },
    });

    userController = new UserController(new userModel());

    userController.signin(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 401);
        done();
      }).catch((error) => done(error));
  });

  it('Returns 404 not found when provided email is not associated with an account', (done) => {
    request = mockRequest({
      body: {
        email: 'non-existent@test.com',
        password: 'secret',
      },
    });

    userController = new UserController(new userModel());
    userController.signin(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 404);
        done();
      }).catch((error) => done(error));
  });

  it('Returns 200 ok with jwt token when provided with valid credentials', (done) => {
    request = mockRequest({
      body: {
        email: 'test@example.com',
        password: 'test',
      },
    });

    userController = new UserController(new userModel());

    userController.signin(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      }).catch((error) => done(error));
  });

  it('Calls next atleast once when an error arises', (done) => {
    let tokengenerator = sinon.stub(authutils, 'generateAuthToken').rejects("something went wrong");
    userController = new UserController(new userModel());
    userController.signin(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error))
      .finally(()=>{
        tokengenerator.restore()
        //done()
      })
  });
});
