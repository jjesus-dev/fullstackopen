const AnecdoteForm = () => {
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('New anecdote');
    
  }

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