import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  //console.log('set token')
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
    .catch(error => console.error('error creating blog', error))
}

const update = (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog)
  return request.then(response => response.data)
}

const remove = () => {

}

export default { getAll, create, update, remove, setToken }