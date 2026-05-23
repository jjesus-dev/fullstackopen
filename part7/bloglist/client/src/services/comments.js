import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getFromBlog = async (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}`)
  return request.then((response) => response.data)
}

const create = async (newComment) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newComment, config)
  return request
    .then((response) => response.data)
    .catch((error) => console.error('error creating a comment', error))
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request
    .then((response) => response.data)
    .catch((error) => console.error('error deleting a comment', error))
}

export default { getFromBlog, create, remove, setToken }
