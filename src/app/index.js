const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const dotenv = require('dotenv');


function initApp(settings_path){
    dotenv.config({path: settings_path});
    const app = express();
    app.use(cors);
    app.use(bodyParser.json());
    return app
}



module.exports = {initApp};
