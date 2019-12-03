const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

const ArticlesController = require('../../src/controllers/articlescontroller');

describe('ArticlesController.createArticle', () => {
  let articlesController;
  let response;
  beforeEach(() => {
    function ArticlesModel() {
      return {
        save: (data) => {
          data.id = 1;
          return Promise.resolve(data);
        },
      };
    }
    response = mockResponse();
    articlesController = new ArticlesController(ArticlesModel);
  });

  it('Returns 200 ok response on success', (done) => {
    const request = mockRequest({
      body: {
        title: 'dummy title',
        article: 'dummy article content',
      },
    });
    articlesController.createArticle(request, response, mockNext).then((resp) => {
      assert.equal(resp.status.args[0][0], 200);
      done();
    })
      .catch((error) => done(error));
  });
});
