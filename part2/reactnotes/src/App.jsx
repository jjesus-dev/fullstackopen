import { useState, useEffect } from "react"
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data);
      })
  };
  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
      console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote('');
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important === true);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data));
    })
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            Show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note}
              toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
        <form onSubmit={addNote}>
          <input type="text" 
            value={newNote}
            onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  )
}

export default App
