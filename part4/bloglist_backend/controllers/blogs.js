const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogList = await Blog.find({});

  return response.json(blogList);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const blogSaved = await blog.save();

  return response.status(201).json(blogSaved);
});

module.exports = blogsRouter;