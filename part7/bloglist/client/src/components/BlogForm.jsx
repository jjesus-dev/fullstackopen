const BlogForm = ({
  onSubmit,
  onTitleChange,
  onUrlChange,
  onAuthorChange,
  title,
  url,
  author,
}) => {
  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={onSubmit} id="blogForm">
        <div>
          <label>
            Title:
            <input
              type="text"
              id="title"
              data-testid="title"
              value={title}
              onChange={onTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="text"
              id="url"
              data-testid="url"
              value={url}
              onChange={onUrlChange}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              id="author"
              data-testid="author"
              value={author}
              onChange={onAuthorChange}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
