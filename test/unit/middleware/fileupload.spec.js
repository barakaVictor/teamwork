const assert = require("assert");
const sinon = require("sinon");
const { mockRequest, mockResponse, mockNext } = require("../../testutils/httpmocks");
const multer = require("../../../src/config/multer-config");
const fileUploadMiddleware = require("../../../src/app/middleware/fileupload");

describe("File upload middleware", function(){
    let request,
        response,
        next,
        upload;
    before(function(){
        request = mockRequest();
        response = mockResponse();
        next = mockNext();
        upload = sinon.stub(multer, "upload").resolves({
            file : {
                path: "/some/random/path"
            }
        })
    })
    after(function(){
        upload.restore()
    })
})