import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from "./request"

function App() {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
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
            <strong> {note.important ? 'important': ''}</strong>
          </li>
        )}
      </ul>
    </>
  )
}

export default App