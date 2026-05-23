import { useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import User from './components/User'
import UserList from './components/UserList'
import ErrorBoundary from './components/ErrorBoundary'
import { getUser } from './services/persistentUser'
import blogService from './services/blogs'
import {
  useBlogs,
  useBlogsActions,
  useCommentsActions,
  useNotification,
  useNotificationActions,
  useSessionStore,
  useUsers,
  useUsersActions,
} from './store'
import { useField } from './useField'

const App = () => {
  const navigation = useNavigate()
  const username = useField('text')
  const password = useField('password')
  const notification = useNotification()
  const { updateMessage } = useNotificationActions()
  const blogs = useBlogs()
  const { createBlog, likeBlog, removeBlog, setBlogs } = useBlogsActions()
  const user = useSessionStore((state) => state.user)
  const login = useSessionStore((state) => state.login)
  const logout = useSessionStore((state) => state.logout)
  const setUser = useSessionStore((state) => state.setUser)
  const users = useUsers()
  const { setUsers } = useUsersActions()
  const { createComment } = useCommentsActions()

  useEffect(() => {
    setBlogs()
    setUsers()
  }, [setBlogs, setUsers])

  useEffect(() => {
    const loggedUserJSON = getUser()
    if (loggedUserJSON) {
      setUser(loggedUserJSON)
      blogService.setToken(loggedUserJSON.token)
    }
  }, [setUser])

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

  const addComment = async (commentObject) => {
    try {
      createComment(commentObject)
      //navigation('/')
      notify(`Comment added! '${commentObject.content}'`)
    } catch (error) {
      console.log(error)
      notify('Error adding a comment', 'error')
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
      await login(username.value, password.value)
      const loggedUser = useSessionStore.getState().user
      blogService.setToken(loggedUser.token)
      username.clearText()
      password.clearText()
      navigation('/')
      notify(`Welcome back, ${loggedUser.name}`)
    } catch (error) {
      console.log(error)
      notify('Wrong credentials', 'error')
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      logout()
      blogService.setToken(null)
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
      handleLogin={handleLogin}
    />
  )

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  const userMatch = useMatch('/users/:id')
  const selectedUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null

  const hoverNavStyle = { '&:hover': { bgcolor: '#f50057' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: '#b53f45' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={hoverNavStyle}
          >
            Users
          </Button>
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
                createComment={addComment}
              />
            }
          />
          <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
          <Route path="/users" element={<UserList users={users} />} />
          <Route
            path="/users/:id"
            element={<User user={selectedUser} loggedUser={user} />}
          />
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
