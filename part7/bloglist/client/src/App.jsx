import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`Blog created: ${returnedBlog.title}`)
      })
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
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter((b) => b.id !== blogObject.id))
        notify(`Blog entry '${blogObject.title}' removed!`)
      } catch (error) {
        console.log(error)
        notify('Error removing a blog', 'error')
      }
    }
  }

  const handleLike = async (blogObject) => {
    try {
      await blogService
        .update(blogObject.id, {
          ...blogObject,
          likes: blogObject.likes + 1,
          user: blogObject.user.id,
        })
        .then((updatedBlog) => {
          setBlogs(blogs.map((b) => (b.id === blogObject.id ? updatedBlog : b)))
          notify(
            `Like added to: '${updatedBlog.title}' by ${updatedBlog.author}`,
          )
        })
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
      notify(`Bye, ${user.name}`)
    } catch (error) {
      console.log(error)
      notify('Error logging out', 'error')
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="Log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Blog App</h2>
        <Notification notification={notification} />
        {loginForm()}
      </div>
    )
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blog App</h2>

      <div>
        <p>
          '{user.name}' logged in.{' '}
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>

      <Notification notification={notification} />

      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          loggedUser={user}
          likeBlog={() => handleLike(blog)}
          deleteBlog={() => handleDelete(blog)}
        />
      ))}
    </div>
  )
}

export default App
