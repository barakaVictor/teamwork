const assert = require('assert');

const sinon = require('sinon');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const uploader = require('../../../src/utils/uploader');

const GifController = require('../../../src/controllers/gifcontroller');

describe('GifController.upload', () => {
  let gifModel;
  let gifController;
  let request;
  let response;
  let next;
  let upload;
  beforeEach(() => {
    response = mockResponse();
    request = mockRequest({
      file: {
        path: '',
      },
    });
    next = mockNext();
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
  it('Returns 200 Ok on successful gif upload', (done) => {
    gifModel = function Model() {
      return {
        save: (data) => {
          data.id = 1;
          return Promise.resolve(data);
        },
      };
    };

    Middleware = function Middleware() {
      return {
        upload: (data) => {
          data.id = 1;
          return Promise.resolve({
            original_filename: "Test.gif",
            public_id: "sytdzjr171xal1xzbkha",
            bytes: 1244022,
            secure_url: "https://res.cloudinary.com/baraka/image/upload/v1587203722/sytdzjr171xal1xzbkha.gif",
            created_at: "2020-04-18T09:55:22.000Z"});
        },
      };
    };    

    gifController = new GifController(new gifModel(), new Middleware());

    gifController.upload(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 201);
        done();
      })
      .catch((error) => done(error));
  });

  it('Calls next when any error is encountered', (done) => {
    gifModel = function Model() {
      return {
        save: () => Promise.reject('Something aint right !!'),
      };
    };

    Middleware = function Middleware() {
      return {
        upload: (data) => {
          data.id = 1;
          return Promise.reject('Something aint right !!');
        },
      };
    }
    gifController = new GifController(new gifModel(), new Middleware());
    gifController.upload(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
