import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const notificationStyle = {
  backgroundColor: "#ddccdd",
  border: "solid 2px",
  padding: "4px",
  marging: "auto",
  textAlign: "center"
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem('loggedUser')

    if (loggedUserInfo) {
      const user = JSON.parse(loggedUserInfo)
      
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotification(`${user.name} successfully logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch (exception) {
      setNotification(`Wrong credentials - ${exception.message}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedUser')

      blogService.setToken(null)
      setUser(null)

      setNotification(`User successfully logged out`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch (exception) {
      setNotification(`Error while logging out - ${exception.message}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`${user.name} added a new entry: ${newBlog.title}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      }).catch(error => {
        setNotification(`Error creating a new blog: ${error.message}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
  }

  const notificationMsg = () => (
    <div>
      <p style={notificationStyle}>{notification}</p>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        {notification !== null && notificationMsg()}

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='txtUsername'>Username:</label>
            <input type='text' id='txtUsername'
              value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <label htmlFor='txtPassword'>Password:</label>
            <input type='password' id='txtPassword'
              value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>

          <button type='submit' name='btnLogin'>
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        <div>
          <p>{user.name} logged in</p>
          <button type='submit' name='btnLogout'>Logout</button>
        </div>
      </form>

      {notification !== null && notificationMsg()}

      <Togglable buttonLabel={'Create new blog'} ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <br />

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App