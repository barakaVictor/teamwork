
const BaseController = require("../app/controllers/base")
class UploadController extends BaseController {
  constructor(model, dependency) {
    super(model, dependency)
    this.upload = this.upload.bind(this);
    this.delete = this.delete.bind(this);
    this.read = this.read.bind(this)
  }

  async read(request, response, next){
    return this.model.find({ id: request.params.gifId })
    .then((obj) => {
      if(obj){
        return response.status(200).json({
          status: "success",
          data: obj
        })
      }
      return response.status(404).json({
        message: "Resource not found"
      })
    }).catch((error)=>next(error))
  }

  async upload(request, response, next) {
    return this.middleware.upload(request, response)
      .then((result) => {
        const image = {
          title: result.original_filename,
          public_id: result.public_id,
          size: result.bytes,
          imageurl: result.secure_url,
          created_on: result.created_at,
        };
        return this.model.save(image)
          .then((data) => response.status(201).json({
            status: 'success',
            data: {
              gifId: data.id,
              message: 'GIF image successfully posted',
              createdOn: data.created_on,
              title: data.title,
              imageUrl: data.imageurl,
            },
          })).catch((error) => {
            throw error;
          });
      }).catch((error) => next(error));
  }

  async delete(request, response, next) {
    return this.model.find({ id: request.params.gifId })
      .then((gif) => {
        if (!gif) {
          return response.status(404).json({
            status: 'error',
            error: 'Requested gif could not be found',
          });
        }

        return this.model.delete({ id: gif.id })
          .then(() => response.status(200).json({
            status: 'Success',
            data: {
              message: 'gif post deleted successfully',
            },
          })).catch((error) => {
            throw error;
          });
      }).catch((error) => next(error));
  }
}

module.exports = UploadController;
