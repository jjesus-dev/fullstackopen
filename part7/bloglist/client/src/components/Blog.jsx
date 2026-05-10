import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'
  const canRemove = true //blog.user ? blog.user.username === false : true

  const blogStyle = {
    borderBottom: 'solid',
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
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
          <div>{nameOfUser}</div>
          {canRemove && <button onClick={deleteBlog}>remove</button>}
        </div>
      )}
    </div>
  )
}
export default Blog
