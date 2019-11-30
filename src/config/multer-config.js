const multer = require('multer');

const mimeTypes = {
  'img/jpg': 'jpg',
  'img/jpeg': 'jpg',
  'img/png': 'png',
  'img/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/gifs');
  },
  filename: (req, file, callback) => {
    const name = file.originalname;
    console.log(mimeTypes[file.mimetype]);
    callback(null, `${name}`);
  },
});

module.exports = multer({ storage }).single('gif');
