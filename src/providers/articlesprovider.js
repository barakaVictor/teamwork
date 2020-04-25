const ArticlesModel = require('../models/article');
const ArticlesController = require('../controllers/articlescontroller');
const Validate = require('../app/middleware/validate');
const ValidationRules = require('../validators/rules/articlevalidator');
const ArticleRoutes = require('../routes/api/v1/articles')

module.exports = (c) => {
  c.service('ArticlesModel', (c) => new ArticlesModel(c.db, null));
  c.service('ArticleValidator', (c) => Validate(ValidationRules()))
  c.service('ArticlesController', (c) => new ArticlesController(c.ArticlesModel));
  c.service('ArticleRoutes', (c) => ArticleRoutes({
    middleware: {
      auth: c.AuthMiddleware,
      validator: c.ArticleValidator
    },
    controller: c.ArticlesController
  }));
};
