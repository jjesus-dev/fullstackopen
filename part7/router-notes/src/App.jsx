import { useState } from 'react'

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  )
}

const Notes = () => {
  return (
    <div>
      <h2>Notes</h2>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

function App() {
  const [page, setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'notes') {
      return <Notes />
    } else if (page === 'users') {
      return <Users />
    }
  }

  const padding = {
    padding: '5px'
  }

  return (
    <>
      <h1>Pages</h1>
      <div>
        <a href='' onClick={toPage('home')} style={padding}>Home</a>
        <a href='' onClick={toPage('notes')} style={padding}>Notes</a>
        <a href='' onClick={toPage('users')} style={padding}>Users</a>
      </div>

      {content()}
    </>
  )
}

export default App
