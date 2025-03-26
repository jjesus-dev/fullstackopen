import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem('loggedUser')

    if (loggedUserInfo) {
      const user = JSON.parse(loggedUserInfo)
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

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(`Wrong credentials - ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedUser')

      setUser(null)
    } catch (exception) {
      setErrorMessage(`Error while logging out - ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App