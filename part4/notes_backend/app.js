const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const app = express();

mongoose.set('strictQuery', false);

logger.info('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;