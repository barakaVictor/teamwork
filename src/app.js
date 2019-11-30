const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('./middleware/cors');

const authRoutes = require('./routes/api/v1/auth');
const gifRoutes = require('./routes/api/v1/gifs');

app.use(cors);

app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/gifs/', gifRoutes);

module.exports = app;
