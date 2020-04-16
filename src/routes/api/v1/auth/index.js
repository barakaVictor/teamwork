const router = require('express').Router();

module.exports = (middleware, Controller) => {
    router.post('/create-user', middleware, Controller.createUser);
    router.post('/signin', Controller.signin);
    return router;
}
