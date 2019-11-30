const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('./middleware/cors');

const authRoutes = require('./routes/api/v1/auth');

app.use(cors);

app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);

module.exports = app;
