import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'

function App() {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes} vote(s) &nbsp;
              <button onClick={() => vote(anecdote.id)}>Vote</button>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2>Create new</h2>
        <form>
          <div><input type="text" /></div>
          <button>Create</button>
        </form>
      </div>
    </>
  )
}

export default App
