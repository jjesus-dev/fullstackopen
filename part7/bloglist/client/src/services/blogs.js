import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  //console.log('set token')
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newBlog, config)
  return request
    .then((response) => response.data)
    .catch((error) => console.error('error creating a blog', error))
}

const update = async (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog)
  return request
    .then((response) => response.data)
    .catch((error) => console.error('error updating a blog', error))
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request
    .then((response) => response.data)
    .catch((error) => console.error('error deleting a blog', error))
}

export default { getAll, create, update, remove, setToken }
