import { useState } from "react";

const Blog = ({ blog }) => {
  const [infoVisibility, setInfoVisibility] = useState(false);

  const blogStyle = {
    margin: 6,
    padding: 2,
    border: '2px solid'
  };

  const blogTitle = {
    backgroundColor: '#ddffdd',
    padding: 2
  }

  const toggleVisibility = () => {
    setInfoVisibility(!infoVisibility);
  }

  const blogInformation = () => (
    <div>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes} &nbsp; <button>like</button></p>
      <p>Author: {blog.author}</p>
    </div>
  )

  return (
    <div style={blogStyle}>
      <p style={blogTitle}>
        {blog.title} &nbsp;
      <button onClick={() => toggleVisibility()}>
        {infoVisibility ? 'Hide' : 'View'}
      </button>
      </p>

      {infoVisibility && blogInformation()} 
    </div>
  );
}

export default Blog