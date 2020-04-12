const ArticlesModel = require('../models/article');
const ArticlesController = require('../controllers/articlescontroller');
module.exports = (c) => {
  c.service('ArticlesModel', (c) => new ArticlesModel(c.db));
  c.service('ArticlesController', (c) => new ArticlesController(c.ArticlesModel));
};
