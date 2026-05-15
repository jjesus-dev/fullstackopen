import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import ErrorBoundary from './components/ErrorBoundary'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  useBlogs,
  useBlogsActions,
  useNotification,
  useNotificationActions,
} from './store'

const App = () => {
  const navigation = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const notification = useNotification()
  const { updateMessage } = useNotificationActions()
  const blogs = useBlogs()
  const { createBlog, likeBlog, removeBlog, setBlogs } = useBlogsActions()

  useEffect(() => {
    setBlogs()
  }, [setBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (text, type = 'success') => {
    updateMessage({ text, type })
    setTimeout(() => {
      updateMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      createBlog(blogObject)
      navigation('/')
      notify(`Blog created: ${blogObject.title}`)
    } catch (error) {
      console.log(error)
      notify('Error adding a blog', 'error')
    }
  }

  const handleDelete = async (blogObject) => {
    if (
      window.confirm(
        `Remove blog '${blogObject.title}' by ${blogObject.author}?`,
      )
    ) {
      try {
        removeBlog(blogObject.id)
        navigation('/')
        notify(`Blog entry '${blogObject.title}' removed!`)
      } catch (error) {
        console.log(error)
        notify('Error removing a blog', 'error')
      }
    }
  }

  const handleLike = async (blogObject) => {
    try {
      likeBlog(blogObject.id)
      notify(`Like added to: '${blogObject.title}'`)
    } catch (error) {
      console.log(error)
      notify('Error liking a blog', 'error')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigation('/')
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      console.log(error)
      notify('Wrong credentials', 'error')
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken(null)
      setUser(null)
      navigation('/')
      notify(`Bye, ${user.name}`)
    } catch (error) {
      console.log(error)
      notify('Error logging out', 'error')
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
    />
  )

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  const hoverNavStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={hoverNavStyle}>
            Blogs
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/create"
            sx={hoverNavStyle}
          >
            New Blog
          </Button>
          {user === null ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={hoverNavStyle}
            >
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              nativeButton={false}
              onClick={handleLogout}
              sx={hoverNavStyle}
            >
              Logout - {user.name}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <ErrorBoundary>
        <Notification notification={notification} />

        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="/login" element={loginForm()} />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                loggedUser={user}
                likeBlog={() => handleLike(blog)}
                deleteBlog={() => handleDelete(blog)}
              />
            }
          />
          <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
          <Route
            path="/*"
            element={
              <div>
                <h2>404 - Page Not Found.</h2>
              </div>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
