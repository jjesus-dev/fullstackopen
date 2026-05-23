const Blog = require('../models/blog')
const Comment = require('../models/comment')
const commentsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')

// All blogs with their comments
commentsRouter.get('/', async (request, response) => {
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

// Comments per blog
commentsRouter.get('/:id', async (request, response) => {
  await Blog.findById(request.params.id)
    .populate('comments', {
      content: 1,
      commentedAt: 1,
      id: 1,
    })
    .then((blog) => {
      response.json(blog.comments)
    })
    .catch((error) => {
      console.log(error)
      response.json(error)
    })
})

commentsRouter.post('/', userExtractor, async (request, response) => {
  const commentWithDate = new Comment({
    ...request.body,
    commentedAt: new Date(),
  })

  if (!commentWithDate.content || !commentWithDate.commentedAt) {
    return response.status(400).send({ error: 'Content or Date missing' })
  }

  const blog = await Blog.findById(request.body.blogId)

  // Set the reference between Comment & Blog
  commentWithDate.blog = blog._id

  blog.comments = blog.comments.concat(commentWithDate._id)
  await blog.save()

  const savedComment = await commentWithDate.save()

  response.status(201).json(savedComment)
})

commentsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const comment = await Comment.findById(request.params.id)

  if (!comment) {
    return response.status(204).end()
  }

  await comment.deleteOne()
  response.status(204).end()
})

module.exports = commentsRouter
