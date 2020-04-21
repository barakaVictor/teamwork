const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');

function initApp(){
    const app = express();
    app.use(cors);
    app.use(bodyParser.json());
    return app
}

module.exports = {initApp};
