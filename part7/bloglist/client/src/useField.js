import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // Custom function to clear text after submit
  const clearText = () => {
    setValue('')
  }

  return { type, value, onChange, clearText }
}
