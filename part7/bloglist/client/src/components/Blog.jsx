import { useState } from 'react'

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogUser = blog.user ? blog.user.name : 'anonymous'
  const canRemove = () => {
    if (loggedUser && loggedUser.username === blog.user.username) {
      return true
    }

    return false
  }

  const blogStyle = {
    borderBottom: 'solid',
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} by {blog.author}{' '}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'View'}
      </button>
      {visible && (
        <div>
          <div style={{ marginTop: 4, marginBlock: 4 }}>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} Likes. <button onClick={likeBlog}>like</button>
          </div>
          <div>{blogUser}</div>
          {canRemove() && <button onClick={deleteBlog}>remove</button>}
        </div>
      )}
    </div>
  )
}
export default Blog
