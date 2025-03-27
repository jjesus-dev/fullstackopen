const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogList = await Blog.find({})
    .populate('user', { username: 1, name: 1 });

  return response.json(blogList);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  let blogLikes = 0;
  const body = request.body;

  if (Object.hasOwn(body, 'likes')) {
    blogLikes = body.likes;
  };

  const user = await User.findById(request.user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: blogLikes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = await User.findById(request.user);
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  } else {
    return response.status(401).json({ error: 'Invalid user' });
  }

});

blogsRouter.put('/:id', async (request, response) => {
  const requestedBlog = await Blog.findById(request.params.id);

  if (requestedBlog) {
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
    };

    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true });
    response.status(200).json(updatedBlog);
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = blogsRouter;