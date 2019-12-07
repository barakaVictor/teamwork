const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const ArticlesController = require('../../src/controllers/articlescontroller');

describe('ArticlesController.createArticle', () => {
  let request;
  let response;
  let next;
  beforeEach(() => {
    request = mockRequest({
      body: {
        title: 'dummy title',
        article: 'dummy article content',
      },
    });
    response = mockResponse();
    next = mockNext();
  });

  it('Returns 200 ok response on success', (done) => {
    function ArticlesModel() {
      return {
        save: (data) => {
          data.id = 1;
          return Promise.resolve(data);
        },
      };
    }
    const articlesController = new ArticlesController(ArticlesModel);

    articlesController.createArticle(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      })
      .catch((error) => done(error));
  });

  it('Calls next on model saving error', (done) => {
    function ArticlesModel() {
      return {
        save: () => Promise.reject('Something aint right!!'),
      };
    }
    const articlesController = new ArticlesController(ArticlesModel);

    articlesController.createArticle(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
