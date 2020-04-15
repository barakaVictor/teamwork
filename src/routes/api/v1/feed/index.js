const router = require('express').Router();

module.exports = (Controller) =>{
    router.get('/', Controller.fetchFeed);
    return router
}


