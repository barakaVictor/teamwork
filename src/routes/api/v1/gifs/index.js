const router = require('express').Router();

module.exports = (options) => {

    let middleware = {...options.middleware};
    let controller = {...options.controller};

    router.get(
        '/:gifId', 
        controller.read
        );

    router.post(
        '/', 
        middleware.auth.authorize, 
        middleware.fileupload, 
        middleware.cloudinaryUpload,
        controller.upload
        );

    router.delete(
        '/:gifId', 
        middleware.auth.authorize, 
        controller.delete
        );
    //router.post('/:gifId/comments', commentsController.commentOnGif);
    return router;
}
