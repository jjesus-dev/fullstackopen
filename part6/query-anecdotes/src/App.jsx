import { useReducer } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { getAll, updateAnecdote } from "./services/anecdotes"
import AnecdoteContext from './AnecdoteContext'

const notiMessageReducer = (state, action) => {
  console.log('action', action);

  switch (action.type) {
    case 'setMessage':
      return { text: action.text }
    default:
      return { text: '' }
  }
}

function App() {
  const [notiMessage, notiMessageDispatch] = useReducer(notiMessageReducer, { text: '' })
  const queryClient = useQueryClient()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newAnecdotes = anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id
        ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    notiMessageDispatch({
      type: 'setMessage',
      text: `Voted ${anecdote.content}!`
    })
    setTimeout(() => {
      notiMessageDispatch('')
    }, 5000);
    
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
      <AnecdoteContext.Provider value={[notiMessage, notiMessageDispatch]}>
        <h3>Anecdote app</h3>

        <Notification text={notiMessage.text} />
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
      </AnecdoteContext.Provider>
    </>
  )
}

export default App
