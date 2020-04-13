const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const ArticlesController = require('../../../src/controllers/articlescontroller');

describe('ArticlesController.read', () => {
  let request;
  let response;
  let next;
  beforeEach(() => {
    request = mockRequest({
        params: {
          articleId: 1,
        },
    });
    response = mockResponse();
    next = mockNext();
  });

  it('Returns the requested article with a 200 ok response status code', (done) => {
    articlesmodel = function ArticlesModel() {
      return {
        find: () => {
          return Promise.resolve({
            "id": 3,
            "title": "this is a test dummy!!!",
            "article": "Here comes the dummy text",
            "created_on": "2020-04-13T11:36:14.674Z"
        });
        },
      };
    }
    const articlesController = new ArticlesController(articlesmodel);

    articlesController.read(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        assert.deepStrictEqual(resp.json.args[0][0], {
            status: "success",
            data:{
                "id": 3,
                "title": "this is a test dummy!!!",
                "article": "Here comes the dummy text",
                "created_on": "2020-04-13T11:36:14.674Z"
            }
        })
        done();
      })
      .catch((error) => done(error));
  });

  it('Returns 404 resource not found error when requested article cannot be found', (done) => {
    function ArticlesModel() {
      return {
        find: () => Promise.resolve(null),
      };
    }
    const articlesController = new ArticlesController(ArticlesModel);

    articlesController.read(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 404);
        done();
      })
      .catch((error) => done(error));
  });

  it('Call next on internal server error', (done) => {
    function ArticlesModel() {
      return {
        find: () => Promise.reject(null),
      };
    }
    const articlesController = new ArticlesController(ArticlesModel);

    articlesController.read(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
