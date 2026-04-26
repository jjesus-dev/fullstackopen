import { useEffect, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useAnecdotes = () => {
  const baseUrl = 'http://localhost:3001/anecdotes'
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(json => {
        setAnecdotes(json)
      })
      .catch(error => console.error('Failed to fetch notes:', error))
  })

  const addAnecdote = async (anecdote) => {
    await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anecdote),
    }).then(response => response.json())
    .catch(error => console.error('Failed to POST a note:', error))

  }

  return {
    anecdotes,
    addAnecdote
  }
}