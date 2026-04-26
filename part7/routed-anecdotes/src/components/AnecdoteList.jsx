import { useNavigate } from 'react-router-dom'
import { useAnecdotes } from "../hooks"

const AnecdoteList = () => {
  const navigate = useNavigate()
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  const handleDelete = (id) => {
    deleteAnecdote(id)
    navigate('/')
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content} <button onClick={() => handleDelete(anecdote.id)}>delete</button></li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList
