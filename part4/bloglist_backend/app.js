const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('Connecting to the Database...');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  }).catch((error) => {
    logger.error('Error connecting to MondoDB', error.message);
  });

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter);

module.exports = app;