import { useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdotes"
import AnecdoteContext from '../AnecdoteContext'

const AnecdoteForm = () => {
  const [notiMessage, notiMessageDispatch] = useContext(AnecdoteContext)
  const queryClient = useQueryClient()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    notiMessageDispatch({
      type: 'setMessage',
      text: `Created ${content}!`
    })
    setTimeout(() => {
      notiMessageDispatch('')
    }, 5000);

    newAnecdoteMutation.mutate({ content, votes: 0 })  
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log('success', newAnecdote);
      
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'], anecdotes.concat(newAnecdote)
      )
    }
  })

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input type='text' name='anecdote' />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm