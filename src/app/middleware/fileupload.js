const multer = require("../../config/multer-config")

module.exports = () => {
    return (request, response, next) =>{
        return multer.upload(request, response, next)
    }
}

