const cloudinary = require("../../config/cloudinary-config")

module.exports =  async (request, response, next) => {
        return cloudinary.upload(request.file.path)
        .then((result) => {
            if(!result){
                return response.status(400).json({
                    status: "error",
                    error: "File upload failed kindly retry again"
                })
            }
            request.cloudinaryResponse = {...result}
            next()
        }).catch((error) =>{
            return response.status(400).json({
                status: "error",
                error: {...error}
            })
        })
}