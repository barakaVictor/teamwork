const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const GifController = require('../../../src/controllers/gifcontroller');

describe('GifController.read', () => {
  let request;
  let response;
  let next;
  beforeEach(() => {
    request = mockRequest({
        params: {
          id: 1,
        },
    });
    response = mockResponse();
    next = mockNext();
  });

  it('Returns the requested gif with a 200 ok response status code', (done) => {
    function GifModel() {
      return {
        find: () => {
          return Promise.resolve({
            "id": 10,
            "title": "barney",
            "public_id": "nv1fhhb8fj8rd6a007fl",
            "size": "1244022",
            "imageurl": "https://res.cloudinary.com/baraka/image/upload/v1586774879/nv1fhhb8fj8rd6a007fl.gif",
            "created_on": "2020-04-13T10:47:59.000Z"
        });
        },
      };
    }
    const gifcontroller = new GifController(new GifModel());

    gifcontroller.read(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        assert.deepStrictEqual(resp.json.args[0][0], {
            status: "success",
            data:{
                "id": 10,
                "title": "barney",
                "public_id": "nv1fhhb8fj8rd6a007fl",
                "size": "1244022",
                "imageurl": "https://res.cloudinary.com/baraka/image/upload/v1586774879/nv1fhhb8fj8rd6a007fl.gif",
                "created_on": "2020-04-13T10:47:59.000Z"
            }
        })
        done();
      })
      .catch((error) => done(error));
  });

  it('Returns 404 resource not found error when requested gif cannot be found', (done) => {
    function GifModel() {
      return {
        find: () => Promise.resolve(null),
      };
    }
    const gifcontroller = new GifController(new GifModel());

    gifcontroller.read(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 404);
        done();
      })
      .catch((error) => done(error));
  });

  it('Call next on internal server error', (done) => {
    function GifModel() {
      return {
        find: () => Promise.reject(null),
      };
    }
    const gifcontroller = new GifController(new GifModel());

    gifcontroller.read(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
