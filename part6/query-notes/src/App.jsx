import { useQuery } from "@tanstack/react-query"
import { getNotes } from "./request"

function App() {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content);
    
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id);
    
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
  })
  console.log(JSON.parse(JSON.stringify(result)));
  
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return (
    <>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input type='text' name='note' />
        <button type='submit'>Add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li key={note.id} onClick={() => toggleImportance(note)}>
            {note.content}
          </li>
        )}
      </ul>
    </>
  )
}

export default App