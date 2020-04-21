/*const assert = require("assert");
const sinon = require("sinon");
const bcrypt = require('bcrypt');
const { mockRequest, mockResponse, mockNext } = require("../../testutils/httpmocks");
const authMiddleware = require("../../../src/app/middleware/auth");


describe("Authentication function of the auth middleware", function(){
    let request,
        response,
        next,
        compare;
    before(function(){
        request = mockRequest({
            body: {
                email: "dummy@test.com",
                password: "password"
            }
        });
        response = mockResponse();
        next = mockNext();
    })

    afterEach(function(){
        compare.restore();
    })

    it("Calls next on successful authentication", function(done){
        compare = sinon.stub(bcrypt, "compare").resolves(true)
        function userModel(){
            return {
                find: (options)=>{
                    return Promise.resolve({
                        username: "Dummy User",
                        email: "dummy@test.com",
                        password: "password"
                    })
                }
            }
        }
        authMiddleware(new userModel())
        .authenticate(request, response, next)
        .then((response) => {
            assert(typeof response === "undefined")
            assert(next.called);
            done();
        }).catch((error) => done(error));
    })

    it("Returns 401 Unauthorised upon authentication failure", function(done){
        compare = sinon.stub(bcrypt, "compare").resolves(false)
        function userModel(){
            return {
                find: (email)=>{
                    db = [{
                        username: "Dummy User",
                        email: "dummy@test.com",
                        password: "password"
                    }]
                    const user = db.find((user)=> user.email === email)
                    return Promise.resolve(user)
                }
            }
        }
        authMiddleware(new userModel())
        .authenticate(request, response, next)
        .then((response) => {
            assert(response)
            assert.equal(response.status.args[0][0], 401);
            assert.equal(response.json.args[0][0].error, "Invalid credentials provided");
            done();
        }).catch((error) => done(error));
    })

    it("Returns 401 Unauthorised upon failure to find user with provide credentials", function(done){
        //compare = sinon.stub(bcrypt, "compare").resolves(true)
        function userModel(){
            return {
                find: (options)=>{
                    return Promise.resolve()
                }
            }
        }
        authMiddleware(new userModel())
        .authenticate(request, response, next)
        .then((response) => {
            assert.equal(response.status.args[0][0], 401);
            assert.equal(response.json.args[0][0].error, "Unauthorised");
            done();
        }).catch((error) => done(error));
    })

})*/