const router = require('express').Router();

module.exports = (Controller) => {
    router.get('/:gifId', Controller.read)
    router.post('/', Controller.upload);
    router.delete('/:gifId', Controller.delete);
    //router.post('/:gifId/comments', commentsController.commentOnGif);
    return router;
}
