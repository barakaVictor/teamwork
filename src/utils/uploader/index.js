const fs = require('fs');
const cloudinary = require('../../config/cloudinary-config');
const multer = require('../../config/multer-config');

function upload(request, response) {
  return new Promise((resolve, reject) => {
    multer.fileSystemUpload(request, response, (error) => {
      if (error) {
        reject(error);
      }
      const filePath = request.file.path;
      cloudinary.cloudinaryUpload(filePath, (cloudinaryerror, result) => {
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
  upload,
};
