const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const ArticlesController = require('../../src/controllers/articlescontroller');

describe('ArticlesController.delete', () => {
  let articlesController;
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

  it('Returns 200 Ok upon successfull article deletion', (done) => {
    function DummyModel() {
      return {
        delete: () => Promise.resolve(),
        find: () => Promise.resolve({
          id: 1,
          title: 'test title',
          article: 'some content',
          created_on: new Date(),
        }),
      };
    }
    articlesController = new ArticlesController(DummyModel);

    articlesController.delete(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        assert.equal(resp.json.args[0][0].data.message, 'Article successfully deleted');
        done();
      })
      .catch((error) => done(error));
  });

  it('Returns 404 not found when requested article to delete does not exist', (done) => {
    function DummyModel() {
      return {
        find: () => Promise.resolve(null),
      };
    }

    articlesController = new ArticlesController(DummyModel);
    articlesController.delete(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 404);
        done();
      })
      .catch((error) => done(error));
  });

  it('Calls next atleast once when an error is encoutered', (done) => {
    function DummyModel() {
      return {
        delete: () => Promise.reject(),
        find: () => Promise.resolve({
          id: 1,
          title: 'some title',
          article: 'article content',
          created_on: new Date(),
        }),
      };
    }
    articlesController = new ArticlesController(DummyModel);
    articlesController.delete(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      }).catch((error) => done(error));
  });
});
