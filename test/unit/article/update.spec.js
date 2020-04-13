const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const ArticlesController = require('../../../src/controllers/articlescontroller');

describe('ArticlesController.update', () => {
  let request;
  let response;
  let next;
  let articlesModel;
  let articlesController;

  beforeEach(() => {
    request = mockRequest({
      params: {
        articleId: 1,
      },
      body: {
        title: 'test',
        article: 'new content coming through',
      },
    });
    response = mockResponse();
    next = mockNext();
  });
  it('Returns 200 Ok message on successful article edit function', (done) => {
    articlesModel = function ArticleModel() {
      return {
        update: (article) => Promise.resolve(article),
        find: () => Promise.resolve({}),
      };
    };
    articlesController = new ArticlesController(articlesModel);
    articlesController.update(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      })
      .catch((error) => done(error));
  });

  it('Returns 404 error code if article to be edited is non-existent', (done) => {
    articlesModel = function ArticleModel() {
      return {
        find: () => Promise.resolve(null),
      };
    };

    articlesController = new ArticlesController(articlesModel);
    articlesController.update(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 404);
        done();
      })
      .catch((error) => done(error));
  });

  it('Calls next when an error is encountered', (done) => {
    articlesModel = function ArticleModel() {
      return {
        find: () => Promise.resolve({
          title: 'test',
          article: 'some content',
        }),
        update: () => Promise.reject(),
      };
    };
    articlesController = new ArticlesController(articlesModel);
    articlesController.update(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
