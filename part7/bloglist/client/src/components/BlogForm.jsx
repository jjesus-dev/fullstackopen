import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addNewBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: title,
      url: url,
      author: author,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const separatorStyle = {
    marginTop: 10,
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={addNewBlog} id="blogForm">
        <div style={separatorStyle}>
          <TextField
            label="Title:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={separatorStyle}>
          <TextField
            label="Url:"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div style={separatorStyle}>
          <TextField
            label="Author:"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div style={separatorStyle}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
