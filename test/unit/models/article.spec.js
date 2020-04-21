"use strict";

const assert = require("assert");

const ArticleModel = require("../../../src/models/article");

describe("ArticleModel", function(){

    describe("update method", function(){
        it("Succesfully updates a record in the database", function(done){
            function db(){
                return {
                    one: async () =>{
                        return Promise.resolve({
                            username: "randomuser",
                            password: "password",
                        })
                    }
                }
            }
            new ArticleModel(new db()).update({newValue: "value"}, {id: 1})
            .then((data) => {
                assert(data)
                done()
            }).catch((error) => done(error))
        })
        it("Throws an error when a db error occurs", function(done){
            function db(){
                return {
                    one: async () =>{
                        throw new Error("Something went wrong!!!")
                    }
                }
            }
            const articleModel = new ArticleModel(new db());
            assert.rejects(articleModel.update({newValue: "value"}, {id: 1}),{ message: "Something went wrong!!!" })
            .then(() => done())
            .catch((error) => done(error))
        })
    })
})