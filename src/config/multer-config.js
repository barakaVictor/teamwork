const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/gifs');
  },
  filename: (req, file, callback) => {
    const name = file.originalname;
    callback(null, `${name}`);
  },
});

const upload = multer({ storage }).single('gif');
module.exports = {
  upload,
};
