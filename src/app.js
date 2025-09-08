const express = require('express');
const pinoHttp = require('pino-http');
const errorHandler = require('./middlewares/errorHandler');
const geminiRoutes = require('./routes/geminiRoutes');
const setupSwagger = require('./config/swaggerConfig');
const logger = require('./config/logging.js');

const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json());

app.use('/api/v1', geminiRoutes);

setupSwagger(app);

app.use(errorHandler);

module.exports = app;