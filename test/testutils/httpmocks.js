const sinon = require('sinon');

const mockRequest = (data) => data;

const mockResponse = () => {
  const response = {};
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);
  return response;
};

const mockNext = sinon.stub();

module.exports = {
  mockRequest,
  mockResponse,
  mockNext,
};
