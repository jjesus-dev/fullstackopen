import { useResource, useField } from './hooks'

function App() {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3001/notes')
  const [persons, personService] = useResource('http://localhost:3001/persons')

  const handleNoteSubmit = (e) => {
    e.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (e) => {
    e.preventDefault
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>Create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          <label htmlFor="name">Name: </label><input {...name} />
        </div>
        <div>
          <label htmlFor="number">Number: </label><input {...number} />
        </div>
        <button>Create</button>
      </form>
      {persons.map(per => <p key={per.id}>{per.name} {per.number}</p>)}
    </>
  )
}

export default App
