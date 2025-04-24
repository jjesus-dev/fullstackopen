import { useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import { useCountry, useField } from './hooks'

function App() {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <>
      <div>
        <form onSubmit={fetch}>
          <input {...nameInput} />
          <button>Find</button>
        </form>
      </div>

      <Country country={country} />
    </>
  )
}

export default App
