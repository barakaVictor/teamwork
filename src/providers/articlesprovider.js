const ArticlesModel = require('../models/article');
const ArticlesController = require('../controllers/articlescontroller');
const ArticleRoutes = require('../routes/api/v1/articles')

module.exports = (c) => {
  c.service('ArticlesModel', (c) => new ArticlesModel(c.db, null));
  c.service('ArticlesController', (c) => new ArticlesController(c.ArticlesModel));
  c.service('ArticleRoutes', (c) => ArticleRoutes(c.ArticlesController));
};
