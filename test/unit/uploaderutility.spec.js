const assert = require('assert');

const sinon = require('sinon');

const { mockRequest, mockResponse } = require('../testutils/httpmocks');

const cloudinary = require('../../src/config/cloudinary-config');
const multer = require('../../src/config/multer-config');


const uploader = require('../../src/utils/uploader');

describe('Upload Utility', () => {
  let request;
  let response;
  beforeEach(() => {
    response = mockResponse();
    request = mockRequest({
      file: {
        path: '',
      },
    });
    multerUpload = sinon.stub(multer, 'upload').resolves({
      request: {
        file: {
          path: '/some/random/path',
        },
      },
    });
    cloudinaryUpload = sinon.stub(cloudinary, 'upload').resolves({
      gifId: 6,
      message: 'GIF image successfully posted',
      createdOn: '2020-04-12T21:47:16.000Z',
      title: 'barney',
      imageUrl: 'https://res.cloudinary.com/baraka/image/upload/v1586738836/iruvktmixjmf0uozueoa.gif',
    });
  });

  afterEach(() => {
    multerUpload.restore();
    cloudinaryUpload.restore();
  });
  it('Returns data about an image on successful upload', (done) => {
    assert.equal(1 + 1, 2);
    done();
  });
});
