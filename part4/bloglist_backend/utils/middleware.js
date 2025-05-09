const logger = require('./logger');
const jwt = require('jsonwebtoken');

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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' });
  }

  request.user = decodedToken.id;

  next();
};

module.exports = {
  unknownEndpoint, errorHandler, tokenExtractor, userExtractor
};