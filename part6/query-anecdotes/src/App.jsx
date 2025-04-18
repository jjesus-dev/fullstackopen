import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { getAll, updateAnecdote } from "./services/anecdotes"

function App() {
  const queryClient = useQueryClient()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log(anecdote.id);
    
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
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
