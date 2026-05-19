import { useField } from '../useField'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  const addNewBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: title.value,
      url: url.value,
      author: author.value,
    })

    e.target.reset()
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
            value={title.value}
            onChange={title.onChange}
          />
        </div>
        <div style={separatorStyle}>
          <TextField label="Url:" value={url.value} onChange={url.onChange} />
        </div>
        <div style={separatorStyle}>
          <TextField
            label="Author:"
            value={author.value}
            onChange={author.onChange}
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
