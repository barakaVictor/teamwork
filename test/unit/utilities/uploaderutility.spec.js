const assert = require('assert');

const sinon = require('sinon');

const { mockRequest, mockResponse } = require('../../testutils/httpmocks');

const cloudinary = require('../../../src/config/cloudinary-config');
const multer = require('../../../src/config/multer-config');

const fs = require('fs')
const uploader = require('../../../src/utils/uploader');

describe('Upload Utility', () => {
  let request;
  let response;
  let fileSystemUpload;
  let cloudinaryUpload;
  let fsOps;
  beforeEach(() => {
    response = mockResponse();
    request = mockRequest({
      file: {
        path: '',
      },
    });
  });

  afterEach(() => {
    fileSystemUpload.restore();
    cloudinaryUpload.restore();
    fsOps.restore();
  });
  it('Returns data about an image on successful upload', (done) => {
    fsOps = sinon.stub(fs, 'unlinkSync')
    fileSystemUpload = sinon.stub(multer, 'fileSystemUpload').yields()
    cloudinaryUpload = sinon.stub(cloudinary, 'upload').yields(null,{
      gifId: 6,
      message: 'GIF image successfully posted',
      createdOn: '2020-04-12T21:47:16.000Z',
      title: 'barney',
      imageUrl: 'https://res.cloudinary.com/baraka/image/upload/v1586738836/iruvktmixjmf0uozueoa.gif',
    });
    uploader.upload(request, response)
    .then((result)=>{
      assert.deepStrictEqual(result,{
        gifId: 6,
        message: 'GIF image successfully posted',
        createdOn: '2020-04-12T21:47:16.000Z',
        title: 'barney',
        imageUrl: 'https://res.cloudinary.com/baraka/image/upload/v1586738836/iruvktmixjmf0uozueoa.gif',
      });
      done();
    })
    .catch((error)=> done(error));
  });
  it('Halts execution and throws an error if local upload fails', (done) => {
    fsOps = sinon.stub(fs, 'unlinkSync')
    fileSystemUpload = sinon.stub(multer, 'fileSystemUpload').yields(new Error("An error was encountered"))
    cloudinaryUpload = sinon.stub(cloudinary, 'upload').yields(null, {});
    assert.rejects(uploader.upload(request, response));
      done();
    });
  it('Halts execution and throws an error if cloud upload fails', (done) => {
    fsOps = sinon.stub(fs, 'unlinkSync')
    fileSystemUpload = sinon.stub(multer, 'fileSystemUpload').yields()
    cloudinaryUpload = sinon.stub(cloudinary, 'upload').yields(new Error("An error was encountered"));
    assert.rejects(uploader.upload(request, response));
      done();
    });
});
