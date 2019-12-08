const router = require('express').Router();

const ArticlesModel = require('../../../../models/article');
const ArticlesController = require('../../../../controllers/articlescontroller');

const articlesController = new ArticlesController(ArticlesModel);

router.post('/', articlesController.createArticle);
router.post('/:articleId', articlesController.patch);
router.delete('/:articleId', articlesController.delete);

module.exports = router;
