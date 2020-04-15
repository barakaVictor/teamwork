const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const CommentsController = require('../../../src/controllers/commentscontroller');

describe('CommentsController.commentOnArticle', () => {
  let request;
  let response;
  let next;
  let commentsController;

  beforeEach(() => {
    request = mockRequest({
      params: {
        articleId: 1,
      },
      body: {
        comment: 'Here comes the comment',
        authorId: 1,
      },
    });
    response = mockResponse();
    next = mockNext();
  });

  it('Returns 200 Ok http response when a comment is posted successfully', (done) => {
    function DummyModel() {
      return {
        save: () => Promise.resolve({
          article: {
            title: 'Some title',
            article: 'Here is some article content',
          },
          comment: {
            created_on: new Date(),
            comment: 'Some random comment',
          },
        }),
      };
    }
    commentsController = new CommentsController(new DummyModel());
    commentsController.commentOnArticle(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      })
      .catch((error) => done(error));
  });

  it('Calls next on when an error is encountered in the execution process', (done) => {
    function DummyModel() {
      return {
        save: () => Promise.reject(),
      };
    }
    commentsController = new CommentsController(new DummyModel());
    commentsController.commentOnArticle(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
