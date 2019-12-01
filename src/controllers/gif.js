const cloudinaryUploadHandler = require('../config/cloudinary-config');
const localUploadHandler = require('../config/multer-config');

class UploadController {
  constructor(Model) {
    this.model = new Model();
    this.upload = this.upload.bind(this);
  }

  async upload(request, response, next) {
    return localUploadHandler(request, response, (error) => {
      if (error) {
        return next(error);
      }

      const filePath = request.file.path;

      return cloudinaryUploadHandler.uploader.upload(filePath, (error, result) => {
        if (error) {
          next(error);
        }
        return response.status(200).json({
          status: 'success',
          data: { ...result },
        });
      });
    });
  }
}

module.exports = UploadController;
