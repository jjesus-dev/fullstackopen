import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useField } from '../useField'
import { useComments, useCommentsActions } from '../store'
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog, createComment }) => {
  const content = useField('text')
  const comments = useComments((state) => state.comments)
  const { setComments } = useCommentsActions()

  const blogId = useParams().id

  useEffect(() => {
    setComments(blogId)
  }, [setComments, blogId])

  // conditional rendering in case `blog` or `loggedUser` aren't defined
  if (!blog) {
    return (
      <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
        This blog doesn't exist.
      </Typography>
    )
  }

  if (!loggedUser) {
    return (
      <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
        Please log in first.
      </Typography>
    )
  }

  const blogUser = blog.user ? blog.user.name : 'anonymous'
  const canRemove = () => {
    if (loggedUser && loggedUser.username === blog.user.username) {
      return true
    }

    return false
  }

  const addNewComment = (e) => {
    e.preventDefault()

    createComment({
      content: content.value,
      blogId: blogId,
    })

    content.clearText()
    e.target.reset()
  }

  const formatDate = (timestamp) => {
    const formattedDate = new Date(timestamp).toUTCString()
    return formattedDate
  }

  const separatorStyle = {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    columnGap: 12,
  }

  return (
    <Card variant="outlined" sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          by {blog.author}
        </Typography>
        <Typography>
          <Link href={blog.url}>{blog.url}</Link>
        </Typography>
        <br />
        <Typography sx={{ color: 'text.secondary' }}>
          Added by {blogUser}
        </Typography>

        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            columnGap: 2,
          }}
        >
          <Typography>{blog.likes} Likes.</Typography>
          <Button onClick={likeBlog} variant="outlined">
            like
          </Button>

          {canRemove() && (
            <Button onClick={deleteBlog} variant="outlined" color="error">
              remove
            </Button>
          )}
        </Box>
        <hr />
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Comments
          </Typography>
          <form onSubmit={addNewComment} id="commentForm">
            <Box style={separatorStyle}>
              <TextField
                label="Write a new comment..."
                value={content.value}
                onChange={content.onChange}
                size="small"
              />

              <Button type="submit" variant="contained">
                Add Comment
              </Button>
            </Box>
          </form>
          <List>
            {comments?.map((c) => (
              <ListItem key={c.id}>
                <ListItemText
                  primary={c.content}
                  secondary={formatDate(c.commentedAt)}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}
export default Blog
