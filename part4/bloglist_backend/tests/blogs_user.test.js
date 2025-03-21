require('dotenv').config();
const { test, describe, after, beforeEach } = require('node:test');
const assert = require('assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const userHelper = require('../utils/user_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(userHelper.initialUsers);
});

test('list is returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

describe('User', () => {
  test('stored in db', async () => {
    const usersAtStart = await userHelper.usersInDb();
    assert.strictEqual(usersAtStart.length, 1);
  });

  test('creation succeeds with valid data', async () => {
    const usersAtStart = await userHelper.usersInDb();

    const newUser = {
      username: 'testingUser2',
      name: 'Testing User 2',
      password: userHelper.TESTING_PASSWORD.concat('', '2')
    };

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await userHelper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usersContent = usersAtEnd.map(u => u.username);
    assert(usersContent.includes('testingUser2'));
  });

  test('creation fails if user already exists', async () => {
    const usersAtStart = await userHelper.usersInDb();

    const existingUser = userHelper.initialUsers[0];

    await api.post('/api/users')
      .send(existingUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await userHelper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test('creation fails if password is too short', async () => {
    const usersAtStart = await userHelper.usersInDb();

    const newUser = {
      username: 'another_one',
      name: 'Another User',
      password: 'aq'
    };

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await userHelper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);

    const errorMessage = result.body.error || '';
    assert(errorMessage.includes('password provided is too short'));
  });
});

after(async () => {
  await mongoose.connection.close();
});