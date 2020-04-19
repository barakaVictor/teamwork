const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app, container} = require('./setup.spec')
const gifsModel = container.GifModel
const userModel = container.UserModel


describe("GET /api/v1/gifs/<:gifId>", function(){
    before(async function(){
        await gifsModel.save({
            title: "Test gif",
            public_id: "sytdzjr171xal1xzbkha",
            size: "1244022",
            imageurl: "https://res.cloudinary.com/baraka/image/upload/v1587203722/sytdzjr171xal1xzbkha.gif",
            created_on: "2020-04-18T09:55:22.000Z"
        })
    })
    it("Returns 200 OK response with the details about the gif object", function(done){
        chai.request(app)
        .get("/api/v1/gifs/1")
        .send()
        .end(function(error, response){
            expect(error).to.be.null
            expect(response).to.have.status(200)
            done()
        })
    })
    after(async function(){
        await gifsModel.truncate()
    })
})

describe("POST /api/v1/gifs", function () {
    before(function(done){
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
    it("Returns 201 Created upon successful posting of a gif", function(done){
        
        chai.request(app)
        .post("/api/v1/auth/signin")
        .send({
            "email": "testadmin4@example.com",
            "password": "random",
        })
        .end(function(error, response){
            expect(error).to.be.null
            chai.request(app)
            .post("/api/v1/gifs")
            .set('Authorization', "Bearer "+ response.body.data.token)
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(201)
                done();
            })
        })
    })

    after(async function() {
        await gifsModel.truncate()
        await userModel.truncate()
    })
})

describe("DELETE /api/v1/gifs/<:gifId>", function () {
    before(function(done){
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
          gifsModel.save({
            title: "Test gif",
            public_id: "sytdzjr171xal1xzbkha",
            size: "1244022",
            imageurl: "https://res.cloudinary.com/baraka/image/upload/v1587203722/sytdzjr171xal1xzbkha.gif",
            created_on: "2020-04-18T09:55:22.000Z"
        }).then(() => {
            done()
        }).catch((error) => done(error))
          
        })
    })
    it("Returns 200 OK upon successful deletion of a gif", function(done){
        
        chai.request(app)
        .post("/api/v1/auth/signin")
        .send({
            "email": "testadmin4@example.com",
            "password": "random",
        })
        .end(function(error, response){
            expect(error).to.be.null
            chai.request(app)
            .delete("/api/v1/gifs/1")
            .set('Authorization', "Bearer "+ response.body.data.token)
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(200)
                done();
            })
        })
    })

    after(async function() {
        await gifsModel.truncate()
        await userModel.truncate()
    })
})