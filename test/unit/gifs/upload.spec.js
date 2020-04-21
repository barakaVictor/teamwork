const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');


const GifController = require('../../../src/controllers/gifcontroller');

describe('GifController.upload', () => {
  let gifController;
  let request;
  let response;
  let next;
  beforeEach(() => {
    response = mockResponse();
    request = mockRequest({
      cloudinaryResponse: {
          original_filename: 'test',
          public_id: 'someid',
          bytes: 'somebytes',
          secure_url: 'https://someurl/',
          created_at: new Date(),
        },
    });
    next = mockNext();
  });

  it('Returns 200 Ok on successful gif upload', (done) => {
    function gifModel() {
      return {
        save: (data) => {
          data.id = 1;
          return Promise.resolve(data);
        },
      };
    }; 

    gifController = new GifController(new gifModel());

    gifController.upload(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 201);
        done();
      })
      .catch((error) => done(error));
  });

  it('Calls next when any error is encountered', (done) => {
    function gifModel() {
      return {
        save: () => Promise.reject('Something aint right !!'),
      };
    };
    gifController = new GifController(new gifModel());
    gifController.upload(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
