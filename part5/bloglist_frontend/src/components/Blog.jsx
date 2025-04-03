import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ blog, loggedUsername, updateBlog, deleteBlog }) => {
  const [infoVisibility, setInfoVisibility] = useState(false);

  const blogStyle = {
    margin: 6,
    padding: 2,
    border: '2px solid'
  };

  const titleStyle = {
    backgroundColor: '#ddffdd',
    padding: 2
  };

  const toggleVisibility = () => {
    setInfoVisibility(!infoVisibility);
  };

  const blogInformation = () => (
    <div>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes}
        &nbsp;<button onClick={addLikes}>like</button></p>
      
      {loggedUsername &&
        loggedUsername === blog.user.username
        ? <button onClick={removeBlog}>Remove</button>
        : <br />
      }
    </div>
  );

  const addLikes = async (event) => {
    event.preventDefault();

    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    });
  };

  const removeBlog = async (event) => {
    event.preventDefault();

    deleteBlog(blog);
  };

  return (
    <div style={blogStyle} className='blog'>
      <p style={titleStyle}>
        {blog.title}
      </p>
      <p>
        Author: {blog.author} &nbsp;
        <button onClick={() => toggleVisibility()}>
          {infoVisibility ? 'Hide' : 'View'}
        </button>
      </p>

      {infoVisibility && blogInformation()}
    </div>
  );
};

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

export default Blog;