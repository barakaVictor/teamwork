const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const GifController = require('../../src/controllers/gifcontroller');

describe('GifController.delete', () => {
  let request;
  let response;
  let next;
  let gifController;
  beforeEach(() => {
    request = mockRequest({
      params: {
        gifId: 1,
      },
    });
    response = mockResponse();
    next = mockNext();
  });

  it('Returns 200 Ok status code on successful gif deletion', (done) => {
    function DummyModel() {
      return {
        find: () => Promise.resolve({
          id: 1,
        }),
        delete: () => Promise.resolve(),
      };
    }

    gifController = new GifController(DummyModel);

    gifController.delete(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      }).catch((error) => done(error));
  });

  it('Returns 404 not found when gif to delete is non-existent', (done) => {
    function DummyModel() {
      return {
        find: () => Promise.resolve(null),
        delete: () => Promise.resolve(),
      };
    }

    gifController = new GifController(DummyModel);

    gifController.delete(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 404);
        done();
      }).catch((error) => done(error));
  });

  it('Calls next when an error is encountered in the execution process', (done) => {
    function DummyModel() {
      return {
        find: () => Promise.resolve({
          id: 1,
        }),
        delete: () => Promise.reject(),
      };
    }

    gifController = new GifController(DummyModel);

    gifController.delete(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      }).catch((error) => done(error));
  });
});
