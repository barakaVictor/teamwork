"use strict";

const assert = require("assert");

const UserModel = require("../../../src/models/user");

describe("BaseModel", function(){

    describe("save method", function() {
        it("Saves an object in the database", function(done){
            let inputdata = {
                username: "randomuser",
                password: "password",
            }
            function db(){
                return {
                    one: async () =>{
                        return Promise.resolve({
                            id: 1,
                            username: "randomuser",
                            password: "password",
                        })
                    }
                }
            }
            new UserModel(new db()).save(inputdata)
            .then((data) => {
                assert.deepStrictEqual(data, 1)
                done();
            }).catch((error) => done(error))
        })

        it("Throws an error when a error is encountered while trying to save a record in the database",function(done){
            function db(){
                return {
                    one: async () =>{
                        throw new Error("Something went wrong")
                    }
                }
            }
            let inputdata = {
                username: "randomuser",
                password: "password",
            }
            const userModel = new UserModel(new db());
            assert.rejects(userModel.save(inputdata),{ message: "Something went wrong" })
            .then(() => done())
            .catch((error) => done(error))
        })
    })

    describe("all method", function() {
        it("Returns all the records from the attached database table", function(done){
            function db(){
                return {
                    any: async () =>{
                        return Promise.resolve([{
                            username: "testuser",
                            password: "password"
                        }])
                    }
                }
            }
            new UserModel(new db()).all()
            .then((data) => {
                assert(data)
                assert(Array.isArray(data))
                done();
            }).catch((error) => done(error))
        })

        it("Throws an error when a error is encountered while trying to save a record in the database",function(done){
            function db(){
                return {
                    any: async () =>{
                        throw new Error("Something went wrong")
                    }
                }
            }
            const userModel = new UserModel(new db());
            assert.rejects(userModel.all(),{ message: "Something went wrong" })
            .then(() => done())
            .catch((error) => done(error))
        })
    })

    describe("find method", function() {

        it("Returns null when the query returns no results", function(done){
            function db(){
                return {
                    oneOrNone: async () =>{
                        return 
                    }
                }
            }
            new UserModel(new db()).find({email: "test@emaple.com"})
            .then((data) => {
                assert(!data)
                done();
            }).catch((error) => done(error))

        })

        it("Returns a single object when the query returns an array with just one object", function(done){
            function db(){
                return {
                    oneOrNone: async () =>{
                        return Promise.resolve(
                            {
                                username: "testuser",
                                password: "password"
                            }
                        )
                    }
                }
            }
            new UserModel(new db()).find({email: "test@emaple.com"})
            .then((data) => {
                assert(data)
                assert.deepStrictEqual(data, {
                    username: "testuser",
                    password: "password"
                })
                done();
            }).catch((error) => done(error))

        })

        it("Throws an error when a error is encountered while trying to save a record in the database",function(done){
            function db(){
                return {
                    oneOrNone: async () =>{
                        throw new Error("Something went wrong")
                    }
                }
            }
            const userModel = new UserModel(new db());
            assert.rejects(userModel.find({email: "test@emaple.com"}),{ message: "Something went wrong" })
            .then(() => done())
            .catch((error) => done(error))
        })
    }) 
})