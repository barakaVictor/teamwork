const sinon = require('sinon');

const mockRequest = (data) => data;

const mockResponse = () => {
  const response = {};
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);
  return response;
};

const mockNext = (data) => {
  throw new Error(data);
};

const dummyDb = {};


module.exports = {
  mockRequest,
  mockResponse,
  mockNext,
  dummyDb,
};
