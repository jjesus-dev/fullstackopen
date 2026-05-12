import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const listStyle = {
    padding: 10,
    marginBottom: 5,
  }

  const linkStyle = {
    color: '#1C71D8',
    textDecoration: 'none',
  }

  return (
    <div>
      <h2>Blogs</h2>

      <ul>
        {sortedBlogs.map((blog) => (
          <li style={listStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`} style={linkStyle}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
