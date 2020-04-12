const assert = require('assert');

const { mockRequest, mockResponse, mockNext } = require('../testutils/httpmocks');

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

  });
});
