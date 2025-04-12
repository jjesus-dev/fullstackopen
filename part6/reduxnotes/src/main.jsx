import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.concat(action.payload)
    return state
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with action',
    important: false,
    id: 2
  }
})

const generateId = () => {
  Number((Math.random() * 1000000).toFixed(0))
}

const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    store.dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  const createNote = (content) => {
    return {
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    }
  }

  const toggleImportanceOf = (id) => {
    return {
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    }
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input type='text' name='note' />
        <button type="submit">Add</button>
      </form>
      <ul>
        {store.getState().map(note => 
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
      <App />
  )
}

renderApp()
store.subscribe(renderApp)