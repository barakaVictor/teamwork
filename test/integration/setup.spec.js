const createContainer = require('../../src/bootstrap')
const container = createContainer({config_path: __dirname+"/../../.env.test.cfg"});

/**Mocking multer and cloudinary upload handlers as implemented in the upload utility */
container.service("FileUploadMiddleware", container => {
    return (request, response, next) =>{
        const dummyFile = {
            file: {
                path: "/some/random/path"
            }
        }
        request = Object.assign(request, dummyFile);
        return next()
    }
})

container.service("CloudinaryUploader", container => {
    return (request, response, next) =>{
        request.cloudinaryResponse = {
            original_filename:"test.gif",
            public_id:"dghghsjkdkls",
            bytes: 36478839,
            secure_url: "https://some/secure/url/test.gif",
            created_at: new Date()
        };
        return next()
    }
})
const db = container.db
const app = require('../../src').createApp(container)
before(function(done){
    db.createTables()
    .then(function(){
        done();
    }).catch(function(error){
        done(error);
    })
  })

after(function(done){
    db.dropTables()
    .then(function(){
        done();
    }).catch(function(error){
        done(error)
    })
  })

  module.exports = {
      app, container
  }