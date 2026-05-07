import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: title,
        url: url,
        author: author
      })

      notify(`Blog created: ${newBlog.title}`)

      setAuthor('')
      setTitle('')
      setUrl('')

      setBlogs(blogs.concat(newBlog))
    } catch (error) {
      console.log(error)
      notify('Error adding a blog', 'error')
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
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:
            <input type="text" value={username} id='txtUsername'
              onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>
        <div>
          <label>Password:
            <input type="password" value={password} id='txtPassword'
              onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            data-testid="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            data-testid="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            data-testid="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
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

  return (
    <div>
      <h2>Blog App</h2>

      <div><p>'{user.name}' logged in. <button onClick={handleLogout}>Logout</button></p></div>

      <Notification notification={notification} />


      {blogForm()}

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App