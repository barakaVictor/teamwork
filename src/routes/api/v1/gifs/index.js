const router = require('express').Router();

const multer = require('../../../../config/multer-config');

router.post('/', multer, (request, response, next) => {
  response.status(200).json({
    status: 'success',
    data: {
      gifId: 1,
      message: 'GIF image successfully posted',
      createdOn: new Date(),
      title: 'Gif',
      imageUrl: 'url',
    },
  });
});

module.exports = router;
