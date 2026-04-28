import axios from "axios"
import { useEffect, useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type, value, onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name !== '') {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(res => setCountry(
          { found: true, data: res.data }
        ))
        .catch(error => {
          console.log(error.message)
          setCountry({ found: false, data: null })
        })
    }
  }, [name])


  return country
}