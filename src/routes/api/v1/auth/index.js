const router = require('express').Router();

module.exports = (options) => {
    router.post('/create-user', options.middleware, options.controller.register);
    router.post('/signin', options.controller.signin);
    return router;
}
