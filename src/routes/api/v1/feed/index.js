const router = require('express').Router();

module.exports = (options) =>{
    let controller = {...options.controller}
    router.get('/', controller.fetchFeed);
    return router
}


