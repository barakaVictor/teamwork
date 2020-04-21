const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadLocation = 'public/gifs';
    fs.mkdir(uploadLocation, {recursive: true}, (err)=>{
      callback(err, 'public/gifs')
    })
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
