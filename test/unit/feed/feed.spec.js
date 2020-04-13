const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../../testutils/httpmocks');

const FeedController = require('../../../src/controllers/feedscontroller');

const dummydata = [
  {
    id: 2,
    title: 'this is a test dummy!!!',
    article: 'Here comes the dummy text',
    created_on: '2020-04-12T21:14:53.707Z',
  },
  {
    id: 1,
    title: 'barney',
    public_id: 'vdxiweiviuc0ueuge724',
    size: '1244022',
    imageurl: 'https://res.cloudinary.com/baraka/image/upload/v1576416938/vdxiweiviuc0ueuge724.gif',
    created_on: '2019-12-15T10:35:38.000Z',
  },
  {
    id: 1,
    title: 'this is a test dummy!!!',
    article: 'Here comes the dummy text',
    created_on: '2019-12-15T06:26:50.982Z',
  },
];

describe('feed', () => {
  let request;
  let response;
  let next;
  beforeEach(() => {
    request = mockRequest();
    response = mockResponse();
    next = mockNext();
  });
  it('Returns a list of articles or posts showing the latest fist', (done) => {
    function FeedModel() {
      return {
        join: () => Promise.resolve(dummydata),
      };
    }
    const feedsController = new FeedController(FeedModel);
    feedsController.fetchFeed(request, response, next)
      .then((resp) => {
        assert.equal(resp.status.args[0][0], 200);
        done();
      }).catch((error) => done(error));
  });
  it('Calls next on feeds fetch error', (done) => {
    function FeedModel() {
      return {
        join: () => Promise.reject('Something aint right!!'),
      };
    }
    const feedsController = new FeedController(FeedModel);

    feedsController.fetchFeed(request, response, next)
      .then(() => {
        assert(next.called);
        done();
      })
      .catch((error) => done(error));
  });
});
