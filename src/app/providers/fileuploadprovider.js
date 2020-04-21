const FileUploadMiddleware = require('../middleware/fileupload')
const CloudinaryUploader = require("../middleware/cloudinaryuploadhandler")
module.exports = (c) => {
    c.service("FileUploadMiddleware", (c) => FileUploadMiddleware())
    c.service("CloudinaryUploader", (c) => CloudinaryUploader)
}