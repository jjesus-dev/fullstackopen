import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnedcoteFilter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(
      anecdotes => dispatch(setAnecdotes(anecdotes))
    )
  }, [])

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
