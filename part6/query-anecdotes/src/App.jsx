import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"

function App() {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    }
  ]

  return (
    <>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <p>{anecdote.content}</p>
            <div>
              <p>has {anecdote.votes}</p>
              <button onClick={() => handleVote(anecdote)}>Vote</button>
            </div>
          </li>
        )}
      </ul>
    </>
  )
}

export default App
