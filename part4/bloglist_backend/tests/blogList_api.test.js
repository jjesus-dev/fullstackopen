const { test, after, beforeEach } = require('node:test');
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

test('a new blog is added to the list', async () => {
  const newBlog = {
    title: 'New Entry',
    author: 'Alex Some',
    url: 'https://myblogishere.net/',
    likes: 5
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  assert.strictEqual(blogsAtEnd.body.length, listHelper.initialBlogs.length + 1);

  const urls = blogsAtEnd.body.map(b => b.url);
  assert(urls.includes('https://myblogishere.net/'));
});

test('blog without likes gets 0 by default', async () => {
  await api.post('/api/blogs')
    .send(listHelper.blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  assert.strictEqual(blogsAtEnd.body.length, listHelper.initialBlogs.length + 1);

  const newBlogLikes = blogsAtEnd.body[blogsAtEnd.body.length - 1].likes;
  assert.deepStrictEqual(newBlogLikes, listHelper.blogWithoutLikes.likes);
});

test('when title or url are missing, blog its not added', async () => {
  const incompleteBlog = {
    title: '',
    author: 'Natalie',
    likes: 0
  };

  await api.post('/api/blogs')
    .send(incompleteBlog)
    .expect(400);

  const blogsAtEnd = await api.get('/api/blogs');
  assert.strictEqual(blogsAtEnd.body.length, listHelper.initialBlogs.length);
});

test('delete a blog from the list', async () => {
  const blogsAtStart = await api.get('/api/blogs');
  const blogToDelete = blogsAtStart.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await api.get('/api/blogs');
  assert.strictEqual(blogsAtEnd.body.length, listHelper.initialBlogs.length - 1);

  const urls = blogsAtEnd.body.map(b => b.url);
  assert(!urls.includes(blogToDelete.url));
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