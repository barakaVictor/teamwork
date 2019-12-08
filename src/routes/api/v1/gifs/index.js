const router = require('express').Router();

const GifModel = require('../../../../models/gif');

const GifController = require('../../../../controllers/gifcontroller');

const gifController = new GifController(GifModel);

router.post('/', gifController.upload);
router.delete('/:gifId', gifController.delete);

module.exports = router;
