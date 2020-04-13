const router = require('express').Router();

const FeedsModel = require('../../../../models/feed');
const FeedsController = require('../../../../controllers/feedscontroller');


const feedsController = new FeedsController(FeedsModel);


router.get('/', feedsController.fetchFeed);

module.exports = router;
