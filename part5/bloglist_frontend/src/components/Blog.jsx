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
      <p>Author: {blog.author}</p>

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
    <div style={blogStyle}>
      <p style={titleStyle}>
        {blog.title} &nbsp;
        <button onClick={() => toggleVisibility()}>
          {infoVisibility ? 'Hide' : 'View'}
        </button>
      </p>

      {infoVisibility && blogInformation()}
    </div>
  );
};

export default Blog;