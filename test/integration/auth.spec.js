const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app, container} = require('./setup.spec')
const userModel = container.UserModel

describe("POST /api/v1/auth/create-user", function(){

    it("Returns 201 Creation on succesful user creation", function(done){
        chai.request(app)
        .post("/api/v1/auth/create-user")
        .send({
            "firstname": "testadmin",
            "lastname": "testadmin",
            "email": "testadmin4@example.com",
            "password": "random",
            "gender": "male",
            "jobrole": "Developer",
            "department": "IT",
            "address": "100 Downing Street"
          })
        .end(function(error, response){
            expect(error).to.be.null
            expect(response).to.have.status(201)
            done()
        })
    })

    it("Returns 422 Unprocessable Entity on validation failure", function(done){
        chai.request(app)
        .post("/api/v1/auth/create-user")
        .send({
            "firstname": "testadmin",
            "lastname": "testadmin",
            "email": "testadmin4@example.com",
            "password": "random",
            "gender": "male",
            "jobrole": "Developer",
            "department": "IT",
            "address": "100 Downing Street"
          })
        .end(function(error, response){
            expect(error).to.be.null
            expect(response).to.have.status(201)
            chai.request(app)
            .post("/api/v1/auth/create-user")
            .send({
                "firstname": "testadmin",
                "lastname": "testadmin",
                "email": "testadmin4@example.com",
                "password": "random",
                "gender": "male",
                "jobrole": "Developer",
                "department": "IT",
                "address": "100 Downing Street"
            })
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(422)
                done()
            })
        })
    })

    afterEach(async function() {
        await userModel.truncate()
    })
})

describe("POST /api/v1/auth/signin", function(){
    afterEach(async function() {
        await userModel.truncate()
    })

    it("Returns 200 OK status when a user succefully signs in", function(done){
        chai.request(app)
            .post("/api/v1/auth/create-user")
            .send({
                "firstname": "testadmin",
                "lastname": "testadmin",
                "email": "testadmin4@example.com",
                "password": "random",
                "gender": "male",
                "jobrole": "Developer",
                "department": "IT",
                "address": "100 Downing Street"
            })
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(201)
                chai.request(app)
                .post("/api/v1/auth/signin")
                .send({
                    "email": "testadmin4@example.com",
                    "password": "random",
                })
                .end(function(error, response){
                    expect(error).to.be.null
                    expect(response).to.have.status(200)
                    expect(response.body.data).to.have.property("token")
                    done();
                })
            })
    })

    it("Returns 401 Unauthorised status when a user provides wrong credentials", function(done){
        chai.request(app)
            .post("/api/v1/auth/create-user")
            .send({
                "firstname": "testadmin",
                "lastname": "testadmin",
                "email": "testadmin4@example.com",
                "password": "random",
                "gender": "male",
                "jobrole": "Developer",
                "department": "IT",
                "address": "100 Downing Street"
            })
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(201)
                chai.request(app)
                .post("/api/v1/auth/signin")
                .send({
                    "email": "testadmin4@example.com",
                    "password": "ranom",
                })
                .end(function(error, response){
                    expect(error).to.be.null
                    expect(response).to.have.status(401)
                    expect(response.body).to.have.property("error")
                    expect(response.body.error).to.eq("Invalid credentials provided")
                    done();
                })
            })
    })
})