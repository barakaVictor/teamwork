const assert = require("assert");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { mockRequest, mockResponse, mockNext } = require("../../testutils/httpmocks");
const authMiddleware = require("../../../src/app/middleware/auth");


describe("Authorization function of the auth middleware", function(){
    let request,
        response,
        next,
        verify;
    beforeEach(function(){
        request = mockRequest({
            headers: {
                authorization: "Bearer token",
            },
            body:{

            }
        });
        response = mockResponse();
        next = mockNext();
    })

    afterEach(function(){
        verify.restore();
    })

    it("Calls next on successful authorization", function(done){
        verify = sinon.stub(jwt, "verify").yields(null, true)
        authMiddleware({})
        .authorize(request, response, next)
        .then((response) => {
            assert(typeof response === "undefined")
            assert(next.called);
            done();
        }).catch((error) => done(error));
    })

    it("Returns 403 Forbidden upon authorization failure", function(done){
        verify = sinon.stub(jwt, "verify").yields("something went wrong", "no token")
        authMiddleware({})
        .authorize(request, response, next)
        .then((response) => {
            assert.equal(response.status.args[0][0], 403);
            assert.equal(response.json.args[0][0].error, "Forbidden");
            done();
        }).catch((error) => done(error));
    })

    it("Returns 401 Unauthorised if no authorization header is present in the request", function(done){
        request = mockRequest({
            headers: {

            },
            body: {

            }
        });
        authMiddleware({})
        .authorize(request, response, next)
        .then((response) => {
            assert.equal(response.status.args[0][0], 401);
            assert.equal(response.json.args[0][0].error, "Unauthorised");
            done();
        }).catch((error) => done(error));
    })

})