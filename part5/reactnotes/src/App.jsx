import { useState, useEffect } from "react"

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import loginService from "./services/login";

import './index.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const hook = () => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  };
  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important !== true);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage(`Wrong credentials - ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
    console.log('logging in with', username);
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        
        <form onSubmit={handleLogin}>
          <div>
            username <input type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
          </div>

          <button type="submit">Login</button>
        </form>
        <br />

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
        <Footer />
      </div>
    </>
  )
}

export default App
