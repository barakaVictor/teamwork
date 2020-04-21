const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app, container} = require('./setup.spec')
const articlesModel = container.ArticlesModel
const userModel = container.UserModel

describe("GET /api/v1/articles/<:articleId>", function(){
    before(async function(){
        await articlesModel.save({
            title: "Test article",
            article: "Some dummy text coming through..."
        })
    })
    
    it("Returns 200 OK response status with a list of articles", function(done){
        chai.request(app)
        .get("/api/v1/articles/1")
        .send()
        .end(function(error, response){
            expect(error).to.be.null
            expect(response).to.have.status(200)
            done()
        })
    })

    after(async function() {
        await articlesModel.truncate()
    })
})

describe("POST /api/v1/articles", function(){
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

    it("Returns 201 Created status with created data on success",(done) => {
        chai.request(app)
        .post("/api/v1/auth/signin")
        .send({
            "email": "testadmin4@example.com",
            "password": "random",
        })
        .end(function(error, response){
            expect(error).to.be.null
            expect(response).to.have.status(200)
            chai.request(app)
            .post("/api/v1/articles")
            .set("Authorization", "Bearer "+ response.body.data.token)
            .send({
                "title": "this is a test dummy!!!",
                "article": "Here comes the dummy text"
            })
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(201)
                done();
            })
        })
    })

    after(async function(){
        await userModel.truncate()
        await articlesModel.truncate()
    })

})

describe("PATCH /api/v1/articles/<:articleId>", function(){
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
          articlesModel.save({
              title: "Test article",
              article: "Some dummy text"
            }).then(() => done())
            .catch((error) => done(error))
        })
        
    })

    it("Returns 200 OK status when an article is successfully updated", function(done){
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: "testadmin4@example.com",
            password: "random"
        })
        .end(function(error, response){
            expect(error).to.be.null
            expect(response).to.have.status(200)
            chai.request(app)
            .patch(`/api/v1/articles/${1}`)
            .set("Authorization", "Bearer "+ response.body.data.token)
            .send({
                "title": "hey there",
                "article": "Here comes the article"
            })
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(200)
                done();
            })
        })   

    })

    after(async function(){
        await userModel.truncate()
        await articlesModel.truncate()
    })


})

describe("DELETE /api/v1/articles/<:articleId>", function(){
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
          articlesModel.save({
              title: "Test article",
              article: "Some dummy text"
            }).then(() => done())
            .catch((error) => done(error))
        })
        
    })

    it("Returns 200 OK response upon successful deletion of an articles", function(done){
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: "testadmin4@example.com",
            password: "random"
        })
        .end(function(error, response){
            expect(error).to.be.null
            chai.request(app)
            .delete("/api/v1/articles/1")
            .set("Authorization", "Bearer "+ response.body.data.token)
            .send()
            .end(function(error, response){
                expect(error).to.be.null
                expect(response).to.have.status(200)
                done();
            })
        })
    })

    after(async function(){
        await userModel.truncate()
        await articlesModel.truncate()
    })

})