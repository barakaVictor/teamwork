const fs = require('fs');
const cloudinary = require('../../config/cloudinary-config');
const { upload } = require('../../config/multer-config');

function fileUpload(request, response) {
  return new Promise((resolve, reject) => {
    upload(request, response, (error) => {
      if (error) {
        reject(error);
      }
      const filePath = request.file.path;
      cloudinary.upload(filePath, (cloudinaryerror, result) => {
        if (cloudinaryerror) {
          reject(cloudinaryerror);
        }
        fs.unlinkSync(filePath);
        resolve(result);
      });
    });
  });
}

module.exports = {
  fileUpload,
};
