import { useState } from 'react'
import { Link, Navigate, Route, Routes, useMatch } from 'react-router-dom'
import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import { Alert, AppBar, Button, Container, IconButton, Toolbar } from '@mui/material'

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
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 1000);
  }

  const padding = {
    padding: '5px'
  }

  const match = useMatch('/notes/:id')
  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <Container>
      <div>
      {(message &&
        <Alert severity='success'>
          {message}
        </Alert>
      )}
      </div>

      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
          </IconButton>
          <Button color='inherit'>
            <Link to='/'>Home</Link>
          </Button>
          <Button color='inherit'>
            <Link to='/notes'>Notes</Link>
          </Button>
          <Button color='inherit'>
            <Link to='/users'>Users</Link>
          </Button>
          <Button color='inherit'>
            {user
              ? <em>{user} logged in</em>
              : <Link to='/login'>Login</Link>
            }
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route path='/users' element={user 
          ? <Users />
          : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
      </Routes>
      
      <footer>
          <br />
          <em>Note app, Department of Computer Science 2025</em>
      </footer>
    </Container>
  )
}

export default App
