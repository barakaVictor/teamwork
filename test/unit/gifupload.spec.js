const assert = require('assert');

const sinon = require('sinon');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const uploader = require('../../src/utils/uploader');

const GifController = require('../../src/controllers/gifcontroller');

describe('GifController.upload', () => {
  let gifController;
  let response;
  let upload;
  beforeEach(() => {
    response = mockResponse();
    function Model() {
      return {
        save: () => Promise.resolve({
          id: 1,
          createdOn: new Date(),
          title: 'test',
          imageUrl: 'http://someurl/',
        }),
      };
    }
    gifController = new GifController(Model);
    upload = sinon.stub(uploader, 'upload').resolves({
      original_filename: 'test',
      public_id: 'someid',
      bytes: 'somebytes',
      secure_url: 'https://someurl/',
      created_at: new Date(),
    });
  });

  afterEach(() => {
    upload.restore();
  });
  it('Returns 200 ok on successful gif upload', (done) => {
    const request = mockRequest({
      file: {
        path: '',
      },
    });
    gifController.upload(request, response, mockNext)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      })
      .catch((error) => done(error));
  });
});
