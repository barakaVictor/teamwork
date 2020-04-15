const FeedsModel = require('../models/feed');
const FeedsController = require('../controllers/feedscontroller');
const FeedRoutes = require('../routes/api/v1/feed')

module.exports = (c) => {
    c.service('FeedsModel', (c) => new FeedsModel(c.db, null));
    c.service('FeedsController', (c) => new FeedsController(c.FeedsModel));
    c.service('FeedRoutes', (c) => FeedRoutes(c.FeedsController));
}