import { useState } from 'react'
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: '5px'
  }

  return (
    <>
    <Router>
      <h2>Pages</h2>
      <div>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/notes'>Notes</Link>
        <Link style={padding} to='/users'>Users</Link>
        {user
          ? <em>{user} logger in</em>
          : <Link style={padding} to='/login'>Login</Link>
        }
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes/:id' element={<Note notes={notes} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route path='/users' element={user 
          ? <Users />
          : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
      </Routes>

      <div>
        <br />
        <em>Note app, Department of Computer Science 2025</em>
      </div>
    </Router>
    </>
  )
}

export default App
