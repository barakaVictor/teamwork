const fs = require('fs');
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
          return next(error);
        }

        const image = {
          title: result.original_filename,
          public_id: result.public_id,
          size: result.bytes,
          imageUrl: result.secure_url,
          createdOn: result.created_at,
        };

        this.model.save(image)
          .then((result) => {
            fs.unlinkSync(filePath);
            return response.status(200).json({
              status: 'success',
              data: {
                gifId: result.id,
                message: 'GIF image successfully posted',
                createdOn: result.createdOn,
                title: result.title,
                imageUrl: result.imageUrl,
              },
            });
          }).catch((error) => next(error));
      });
    });
  }
}

module.exports = UploadController;
