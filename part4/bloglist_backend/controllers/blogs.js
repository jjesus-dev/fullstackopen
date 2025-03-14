const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogList = await Blog.find({});

  return response.json(blogList);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!Object.hasOwn(blog, 'likes')) {
    blog.likes = 0;
  };

  try {
    const blogSaved = await blog.save();
    return response.status(201).json(blogSaved);
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      return response.status(400).json({ error: exception.message });
    } else {
      throw Error(exception);
    }
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;