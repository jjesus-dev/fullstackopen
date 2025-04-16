import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find(a => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };

      const newAnecdotes = state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote
      );

      return newAnecdotes.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer