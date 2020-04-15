const router = require('express').Router();

//const validate = require('../../../../middleware/validate');

module.exports = (Validators, Controller) => {
    router.post('/create-user', Validators, Controller.createUser);
    router.post('/signin', Controller.signin);
    return router;
}
