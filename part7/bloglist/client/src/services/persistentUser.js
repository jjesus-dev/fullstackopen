export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  const jsonUser = JSON.parse(loggedUserJSON)
  return jsonUser
}

export const saveUser = (user) => {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
}

export const removeUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
}
