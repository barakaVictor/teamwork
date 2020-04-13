const router = require('express').Router();

const ArticlesModel = require('../../../../models/article');
const ArticleCommentsModel = require('../../../../models/articlecomments');
const ArticlesController = require('../../../../controllers/articlescontroller');
const CommentsController = require('../../../../controllers/commentscontroller');


const articlesController = new ArticlesController(ArticlesModel);
const commentsController = new CommentsController(ArticleCommentsModel);

router.get('/:articleId', articlesController.read);
router.post('/', articlesController.create);
router.patch('/:articleId', articlesController.update);
router.delete('/:articleId', articlesController.delete);
router.post('/:articleId/comment', commentsController.commentOnArticle);

module.exports = router;
