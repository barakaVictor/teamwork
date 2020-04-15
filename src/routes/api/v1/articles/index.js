const router = require('express').Router();

module.exports = (Controller) => {
    router.get('/:articleId', Controller.read);
    router.post('/', Controller.create);
    router.patch('/:articleId', Controller.update);
    router.delete('/:articleId', Controller.delete);
    //router.post('/:articleId/comment', commentsController.commentOnArticle);
    return router;

}
