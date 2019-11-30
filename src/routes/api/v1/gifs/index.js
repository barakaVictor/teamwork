const router = require('express').Router();

router.post('/', (request, response, next) => {
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
