const logger = require('./logger');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error('****');
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'MongoServerError'
    && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).send({ error: 'Expected `username` to be unique' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'Invalid token' });
  } else if (error.name === 'SyntaxError'
    && error.message.includes('Bad control character in string literal in JSON')) {
    return response.status(401).send({ error: 'Malformed token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).send({ error: 'Token has expired' });
  }

  next(error);
};

module.exports = {
  unknownEndpoint, errorHandler
};