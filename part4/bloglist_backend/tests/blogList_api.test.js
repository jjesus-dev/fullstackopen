const { test, describe, after, beforeEach } = require('node:test');
const assert = require('assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const listHelper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogList = listHelper.initialBlogs
    .map(blog => new Blog(blog));

  const promiseList = blogList.map(blog => blog.save());
  await Promise.all(promiseList);
});

describe('Bloglist', () => {
  test('list is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, listHelper.initialBlogs.length);
  });

  test('all blogs have an id', async () => {
    const response = await api.get('/api/blogs');

    const blogsWithId = response.body.filter((b) =>  Object.hasOwn(b, 'id') === true);

    assert.strictEqual(blogsWithId.length, listHelper.initialBlogs.length);
  });
});

describe('Create', () => {
  test('a new blog succeeds', async () => {
    const loginResponse = await api.post('/api/login')
      .send(listHelper.validUser())
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(listHelper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, listHelper.initialBlogs.length + 1);

    const urls = blogsAtEnd.body.map(b => b.url);
    assert(urls.includes('https://myblogishere.net/'));
  });

  test('a blog without likes gets 0 by default', async () => {
    const loginResponse = await api.post('/api/login')
      .send(listHelper.validUser())
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(listHelper.blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, listHelper.initialBlogs.length + 1);

    const newBlogLikes = blogsAtEnd.body[blogsAtEnd.body.length - 1].likes;
    assert.deepStrictEqual(newBlogLikes, listHelper.blogWithoutLikes.likes);
  });

  test('a blog fails when title or url are missing', async () => {
    const incompleteBlog = {
      title: '',
      author: 'Natalie',
      likes: 0
    };

    const loginResponse = await api.post('/api/login')
      .send(listHelper.validUser())
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(incompleteBlog)
      .expect(400);

    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, listHelper.initialBlogs.length);
  });
});

describe('Delete', () => {
  test('a blog from the list succeeds', async () => {
    // Create a new blog first to have a valid userId from the blog
    const loginResponse = await api.post('/api/login')
      .send(listHelper.validUser())
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(listHelper.blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsBeforeDel = await api.get('/api/blogs');
    const blogToDelete = blogsBeforeDel.body[blogsBeforeDel.body.length - 1];

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(204);

    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, blogsBeforeDel.body.length - 1);

    const urls = blogsAtEnd.body.map(b => b.url);
    assert(!urls.includes(blogToDelete.url));
  });

  test('a blog from the list fails when no token is provided', async () => {
    // Create a new blog first to have a valid userId from the blog
    const loginResponse = await api.post('/api/login')
      .send(listHelper.validUser())
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(listHelper.blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsBeforeDel = await api.get('/api/blogs');
    const blogToDelete = blogsBeforeDel.body[blogsBeforeDel.body.length - 1];

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401);
  });
});

test('update likes of a given blog', async () => {
  const blogsAtStart = await api.get('/api/blogs');
  const blogToUpdate = blogsAtStart.body[0];

  blogToUpdate.likes = 22;

  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200);

  const blogsAtEnd = await api.get('/api/blogs');
  const updatedBlog = blogsAtEnd.body.find(b => b.id === blogToUpdate.id);

  assert.deepStrictEqual(blogToUpdate, updatedBlog);
});

after(async () => {
  await mongoose.connection.close();
});