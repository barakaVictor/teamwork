const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const container = require('./container');

const cors = require('./middleware/cors');

const authRoutes = require('./routes/api/v1/auth');
const gifRoutes = require('./routes/api/v1/gifs');
const articleRoutes = require('./routes/api/v1/articles');

app.use(cors);
app.set('container', container);

app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/gifs', gifRoutes);
app.use('/api/v1/articles', articleRoutes);

module.exports = app;
