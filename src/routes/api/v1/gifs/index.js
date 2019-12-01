const router = require('express').Router();

const GifModel = require('../../../../models/gif');

const GifController = require('../../../../controllers/gif');

const gifController = new GifController(GifModel);

router.post('/', gifController.upload);

module.exports = router;