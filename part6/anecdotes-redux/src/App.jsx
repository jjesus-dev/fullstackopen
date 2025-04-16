import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnedcoteFilter'
import Notification from './components/Notification'

function App() {
  return (
    <>
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <AnecdoteFilter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </>
  )
}

export default App
