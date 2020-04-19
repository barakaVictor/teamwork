const GifModel = require('../models/gif')
const GifController = require('../controllers/gifcontroller')
const GifRoutes = require('../routes/api/v1/gifs')
const FileUploadMiddleware = require('../utils/uploader')

module.exports = (c) => {
    c.service('GifModel', (c) => new GifModel(c.db, null))
    c.service('FileUploadMiddleware', (c) => FileUploadMiddleware)
    c.service('GifController', (c) => new GifController(c.GifModel, c.FileUploadMiddleware))
    c.service('GifRoutes', (c) => GifRoutes({
        middleware:{
            auth: c.AuthMiddleware,
            fileupload: c.MulterUploader,
            cloudupload: c.CloudinaryUploader
        },
        controller: c.GifController
    }))
}