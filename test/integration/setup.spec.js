const createContainer = require('../../src/bootstrap')
const container = createContainer({config_path: __dirname+"/../../.env.test.cfg"});

/**Mocking multer and cloudinary upload handlers as implemented in the upload utility */
container.service("FileUploadMiddleware", container => {
    return  {
        upload: async (request, response) =>{
            return {
                original_filename: "Test.gif",
                public_id: "sytdzjr171xal1xzbkha",
                bytes: 1244022,
                secure_url: "https://res.cloudinary.com/baraka/image/upload/v1587203722/sytdzjr171xal1xzbkha.gif",
                created_at: "2020-04-18T09:55:22.000Z"
            }
        }
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