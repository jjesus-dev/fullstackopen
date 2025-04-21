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
    
    newAnecdoteMutation.mutate({ content, votes: 0 })
    
    setTimeout(() => {
      notiMessageDispatch('')
    }, 5000);
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'], anecdotes.concat(newAnecdote)
      )

      notiMessageDispatch({
        type: 'setMessage',
        text: `Created ${newAnecdote.content}!`
      })
    },
    onError: (error) => {
      let errorMessage = ''

      if (error.response) {
        errorMessage = error.response.data.error
      } else {
        errorMessage = error.message
      }

      notiMessageDispatch({
        type: 'setMessage',
        text: `Error: ${errorMessage}!`
      })
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