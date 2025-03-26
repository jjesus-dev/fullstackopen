import { useState, useEffect } from "react"

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import loginService from "./services/login";

import './index.css';
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const hook = () => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  };
  useEffect(hook, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

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
        console.log(error.message);
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

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      
      console.log('logging in with', username);
    } catch (exception) {
      setErrorMessage(`Wrong credentials - ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin} />

          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <h1>Notes App</h1>
        <Notification message={errorMessage} />

        {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged-in</p>
            <Togglable buttonLabel='New note'>
              <NoteForm onSubmit={addNote}
                value={newNote}
                handleChange={handleNoteChange}
              />
            </Togglable>
          </div>
        }
        <br />

        <h2>List</h2>
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

        <Footer />
      </div>
    </>
  )
}

export default App
