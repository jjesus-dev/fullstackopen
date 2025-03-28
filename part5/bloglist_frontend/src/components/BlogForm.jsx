import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    });

    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  };

  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='txtTitle'>Title:</label>
          <input type='text' id='txtTitle'
            value={blogTitle}
            onChange={event => setBlogTitle(event.target.value)} />
        </div>
        <div>
          <label htmlFor='txtAuthor'>Author:</label>
          <input type='text' id='txtAuthor'
            value={blogAuthor}
            onChange={event => setBlogAuthor(event.target.value)} />
        </div>
        <div>
          <label htmlFor='txtUrl'>Url:</label>
          <input type='text' id='txtUrl'
            value={blogUrl}
            onChange={event => setBlogUrl(event.target.value)} />
        </div>
        <br />

        <button type='submit' name='btnAddBlog'>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;