import { Box, Button, Card, CardContent, Link, Typography } from '@mui/material'

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
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
      </CardContent>
    </Card>
  )
}
export default Blog
