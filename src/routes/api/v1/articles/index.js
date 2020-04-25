const router = require('express').Router();

module.exports = (options) => {
    let middleware = {...options.middleware}
    let controller = {...options.controller}
    router.get(
        '/:articleId',
        options.controller.read
    );

    router.post(
        '/',
        middleware.auth.authorize, 
        middleware.validator,
        controller.create
     );

    router.patch(
        '/:articleId', 
        middleware.auth.authorize, 
        controller.update
        );

    router.delete(
        '/:articleId',  
        middleware.auth.authorize, 
        controller.delete
        );
    //router.post('/:articleId/comment', commentsController.commentOnArticle);
    return router;

}
