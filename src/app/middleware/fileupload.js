const multer = require("../../config/multer-config")

module.exports = () => {
    return (request, response, next) =>{
        return multer.upload(request, response, (error) => {
            if(!request.file){
                return response.status(400).json({
                    status: "error",
                    error: "empty file object not accepted"
                })
            }
            next();
        })
    }
}

