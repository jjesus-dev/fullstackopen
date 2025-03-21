require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersInDb = async () => {
  const users = await User.find({});

  return users.map(user => user.toJSON());
};

const hashPassword = (myPassword) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(myPassword, salt);

  return passwordHash;
};

const TESTING_PASSWORD = process.env.TEST_USERSPASS;

const initialUsers = [
  {
    username: 'testingUser',
    name: 'Testing User',
    passwordHash: hashPassword(TESTING_PASSWORD)
  }
];

module.exports = {
  TESTING_PASSWORD, initialUsers, usersInDb
};