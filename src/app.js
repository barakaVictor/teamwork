const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('./middleware/cors');

const routes = require('./routes/api/v1');

app.use(cors);

app.use(bodyParser.json());

app.use('/api/v1', routes);

module.exports = app;
