const assert = require("assert");
const sinon = require("sinon");

const { mockRequest, mockResponse, mockNext } = require("../../testutils/httpmocks")

const cloudinary = require("../../../src/config/cloudinary-config");

const cloudinaryMiddleware = require("../../../src/app/middleware/cloudinaryuploadhandler")

describe("Cloudinary upload middleware", function(){
    let request; 
    let response;
    let next;
    let upload;
    before(function(){
        request = mockRequest({
            file: {
                path: "/some/random/path"
            }
        })
        response = mockResponse()
        next = mockNext()
    })
    afterEach(function() {
        upload.restore()
    })

    it("Injects data gotten from the cloudinary API into the request object", function(done){
        upload = sinon.stub(cloudinary, "upload").resolves({
            original_filename: 'test',
            public_id: 'someid',
            bytes: 'somebytes',
            secure_url: 'https://someurl/test.gif',
            created_at: '2020-04-20T19:01:04.515Z',
        })
        cloudinaryMiddleware(request, response, next)
        .then((response)=> {
            assert.equal(typeof response, 'undefined')
            assert.deepStrictEqual(request.cloudinaryResponse, {
                original_filename: 'test',
                public_id: 'someid',
                bytes: 'somebytes',
                secure_url: 'https://someurl/test.gif',
                created_at: '2020-04-20T19:01:04.515Z',
            })
            assert(next.called)
            done();
        }).catch((error) => done(error))
    })

    it("Returns 400 error response when the cloudinary API fails to return a response", function(done){
        upload = sinon.stub(cloudinary, "upload").resolves()
        cloudinaryMiddleware(request, response, next)
        .then((response) => {
            assert.equal(response.status.args[0][0], 400)
            done();
        }).catch((error) => done(error))

    })

    it("Returns 400 error response when an error is encountered in the upload API call", function(done){
        upload = sinon.stub(cloudinary, "upload").rejects("Something went wrong during upload")
        cloudinaryMiddleware(request, response, next)
        .then((response) => {
            assert.equal(response.status.args[0][0], 400)
            done();
        }).catch((error) => done(error))

    })
})