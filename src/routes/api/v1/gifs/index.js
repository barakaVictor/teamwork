const router = require('express').Router();

const GifCommentsModel = require('../../../../models/gifcomments');
const GifModel = require('../../../../models/gif');
const GifController = require('../../../../controllers/gifcontroller');

const CommentsController = require('../../../../controllers/commentscontroller');

const gifController = new GifController(GifModel);
const commentsController = new CommentsController(GifCommentsModel);


router.post('/', gifController.upload);
router.delete('/:gifId', gifController.delete);
router.post('/:gifId/comments', commentsController.commentOnGif);

module.exports = router;
