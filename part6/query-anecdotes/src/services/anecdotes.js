import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  const anecdotes = axios.get(baseUrl).then(res => res.data)
  console.log(anecdotes);
  
  return anecdotes
}

const createAnecdote = (newAnecdote) => {
  const result = axios.post(baseUrl, newAnecdote)
    .then(res => res.data)

  return result
}

const updateAnecdote = (anecdote) => {
  const anecdoteToUpdate = {
    content: anecdote.content,
    votes: anecdote.votes
  }

  const updatedAnecdote = axios.put(
    `${baseUrl}/${anecdote.id}`, anecdoteToUpdate
  ).then(res => res.data)

  return updatedAnecdote;
}

export { getAll, createAnecdote, updateAnecdote }