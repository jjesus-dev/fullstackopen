import { useQuery } from "@tanstack/react-query"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { getAll } from "./services/anecdotes"

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    console.log(error.message)
    return <span>Error: Anecdote service not available due to problems in the server</span>
  }

  return (
    <>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      <ul>
        {data.map(anecdote =>
          <li key={anecdote.id}>
            <p>{anecdote.content}</p>
            <div>
              <span>has {anecdote.votes} </span>
              <button onClick={() => handleVote(anecdote)}>Vote</button>
            </div>
          </li>
        )}
      </ul>
    </>
  )
}

export default App
