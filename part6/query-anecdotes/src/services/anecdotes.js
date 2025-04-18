import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  const anecdotes = axios.get(baseUrl).then(res => res.data)
  console.log(anecdotes);
  
  return anecdotes
}

export { getAll }