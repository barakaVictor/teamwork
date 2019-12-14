const router = require('express').Router();

const ArticlesModel = require('../../../../models/article');
const ArticleCommentsModel = require('../../../../models/articlecomments');
const ArticlesController = require('../../../../controllers/articlescontroller');
const CommentsController = require('../../../../controllers/commentscontroller');


const articlesController = new ArticlesController(ArticlesModel);
const commentsController = new CommentsController(ArticleCommentsModel);


router.post('/', articlesController.createArticle);
router.patch('/:articleId', articlesController.patch);
router.delete('/:articleId', articlesController.delete);
router.post('/:articleId/comment', commentsController.commentOnArticle);

module.exports = router;
