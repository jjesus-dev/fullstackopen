const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>
        <p>Has {anecdote.votes} vote(s)</p>
        <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    </div>
  )
}

export default Anecdote