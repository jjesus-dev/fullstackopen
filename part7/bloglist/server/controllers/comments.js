const Blog = require('../models/blog')
const Comment = require('../models/comment')
const commentsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')

commentsRouter.get('/', (request, response) => {
  Comment.find({})
    .populate('blog', {
      title: 1,
      url: 1,
      author: 1,
      id: 1,
    })
    .then((comments) => {
      response.json(comments)
    })
})

commentsRouter.post('/', userExtractor, async (request, response) => {
  const comment = new Comment(request.body)

  if (!comment.content || !comment.commentedAt) {
    return response.status(400).send({ error: 'Content or Date missing' })
  }

  const blog = await Blog.findById(request.body.blogId)

  // Set the reference between Comment & Blog
  comment.blog = blog._id

  blog.comments = blog.comments.concat(comment._id)
  await blog.save()

  const savedComment = await comment.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter
