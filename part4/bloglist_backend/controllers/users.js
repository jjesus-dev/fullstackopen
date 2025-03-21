const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { url: 1, title: 1, author: 1 });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password === undefined) {
    return response.status(400)
      .send({ error: 'The password is missing' });
  }

  if (password !== undefined && password.length < 3) {
    return response.status(400)
      .send({ error: 'The password provided is too short, must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user = new User({
    username, name, passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;