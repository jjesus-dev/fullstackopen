import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Notes from './components/Notes'
import Users from './components/Users'

function App() {
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
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/users' element={<Users />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2025</i>
      </div>
    </Router>
    </>
  )
}

export default App
