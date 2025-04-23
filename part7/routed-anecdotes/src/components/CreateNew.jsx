import { useState } from 'react'

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <div>Content: 
          <input type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        <div>Author:
        <input type='text' name='author' value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div>Url for more info:
          <input type='text' name='info' value={info} onChange={(e) => setInfo(e.target.value)}/>
        </div>
      </form>
    </div>
  )
}

export default CreateNew