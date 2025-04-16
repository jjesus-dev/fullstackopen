import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes} vote(s) &nbsp;
            <button onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList