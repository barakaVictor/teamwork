"use strict";

const assert = require("assert");

const BaseModel = require("../../../src/app/models/base");

describe("BaseModel", function(){

    describe("table class property", function(){
        
        it("Sets to the lowercase version of the current class object if not specified with an appended 's'", function(){
            assert.equal(new BaseModel({}).table(), "basemodels")
        })

        it("Sets to the lowercase version of the specified table name with an appended 's'", function(){
            assert.equal(new BaseModel({}, 'TestTable').table(), "testtables")
        })
    })

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
                            username: "randomuser",
                            password: "password",
                        })
                    }
                }
            }
            new BaseModel(new db()).save(inputdata)
            .then((data) => {
                assert.deepStrictEqual(data, inputdata)
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
            const baseModel = new BaseModel(new db());
            assert.rejects(baseModel.save(inputdata),{ message: "Something went wrong" })
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
            new BaseModel(new db()).all()
            .then((data) => {
                assert(data)
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
            const baseModel = new BaseModel(new db());
            assert.rejects(baseModel.all(),{ message: "Something went wrong" })
            .then(() => done())
            .catch((error) => done(error))
        })
    })

    describe("find method", function() {
        it("Returns all the records matching the search query provided", function(done){
            function db(){
                return {
                    manyOrNone: async () =>{
                        return Promise.resolve([
                            {
                                username: "testuser",
                                password: "password"
                            },
                            {
                                username: "testuser",
                                password: "password"
                            }
                        ])
                    }
                }
            }
            new BaseModel(new db()).find({email: "test@emaple.com"})
            .then((data) => {
                assert(data)
                assert(Array.isArray(data))
                done();
            }).catch((error) => done(error))
        })

        it("Returns null when the query returns no results", function(done){
            function db(){
                return {
                    manyOrNone: async () =>{
                        return Promise.resolve([])
                    }
                }
            }
            new BaseModel(new db()).find({email: "test@emaple.com"})
            .then((data) => {
                assert(!data)
                done();
            }).catch((error) => done(error))

        })

        it("Returns a single object when the query returns an array with just one object", function(done){
            function db(){
                return {
                    manyOrNone: async () =>{
                        return Promise.resolve([
                            {
                                username: "testuser",
                                password: "password"
                            }
                        ])
                    }
                }
            }
            new BaseModel(new db()).find({email: "test@emaple.com"})
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
                    manyOrNone: async () =>{
                        throw new Error("Something went wrong")
                    }
                }
            }
            const baseModel = new BaseModel(new db());
            assert.rejects(baseModel.find({email: "test@emaple.com"}),{ message: "Something went wrong" })
            .then(() => done())
            .catch((error) => done(error))
        })
    })

    describe("delete method", function() {
        it("Deletes an object from the database", function(done){
            function db(){
                return {
                    none: async () =>{
                        return Promise.resolve()
                    }
                }
            }
            new BaseModel(new db()).delete({id:1})
            .then((data) => {
                assert(data)
                done();
            }).catch((error) => done(error))
        })

        it("Throws an error when a error is encountered while trying to save a record in the database",function(done){
            function db(){
                return {
                    none: async () =>{
                        throw new Error("Something went wrong")
                    }
                }
            }
            const baseModel = new BaseModel(new db());
            assert.rejects(baseModel.delete({id:1}),{ message: "Something went wrong" })
            .then(() => done())
            .catch((error) => done(error))
        })
    })

    describe("truncate method", function() {
        it("Truncates the attached database table", function(done){
            function db(){
                return {
                    none: async () =>{
                        return Promise.resolve()
                    }
                }
            }
            new BaseModel(new db()).truncate()
            .then((data) => {
                assert(data)
                done();
            }).catch((error) => done(error))
        })

        it("Throws an error when a error is encountered while trying to save a record in the database",function(done){
            function db(){
                return {
                    none: async () =>{
                        throw new Error("Something went wrong")
                    }
                }
            }
            const baseModel = new BaseModel(new db());
            assert.rejects(baseModel.truncate(),{ message: "Something went wrong" })
            .then(() => done())
            .catch((error) => done(error))
        })
    })

    describe("isEmpty Utility method", function(){
        it("Returns false when given a number or boolean", function(){
            assert(!new BaseModel({}).isEmpty(1))
            assert(!new BaseModel({}).isEmpty(true))
        })
        it("Returns true if data provided is undefined or null", function(){
            assert(new BaseModel({}).isEmpty(undefined))
            assert(new BaseModel({}).isEmpty(null))
        })
        it("Returns true if provided with an empty array", function(){
            assert(new BaseModel({}).isEmpty([]))
        })
        it("Returns true if provided with an empty object", function(){
            assert(new BaseModel({}).isEmpty({}))
        })
        it("Returns false if provided with a non-empty object", function(){
            assert(!new BaseModel({}).isEmpty({property: "value"}))
        })

    })

    describe("convertArrayWithSingleObjectToObject utility method", function(){
        it("Returns the only object in an array when given an array with a single object", function(){
            const result = new BaseModel().convertArrayWithSingleObjectToObject([{
                property: "value"
            }]);
            assert(!Array.isArray(result))
            assert.deepStrictEqual(result,{ property: "value"})
        })

        it("Returns the provided array when the given array has more than one object", function(){
            const result = new BaseModel().convertArrayWithSingleObjectToObject([
                {
                    property: "value"
                },
                {
                    property: "value"
                }
            ]);
            assert(Array.isArray(result))
        })
    })
})