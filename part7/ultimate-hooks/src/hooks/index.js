import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type, value, onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => setResources(res.data))
      .catch(error => {
        console.log(error.message)
      })
  }, [setResources, baseUrl])
  
  const create = async (newResource) => {
    const res = await axios.post(baseUrl, newResource);
    setResources(resources.concat(res.data));
    console.log(resources)
  }

  const service = {
    create
  }

  return [resources, service]
}