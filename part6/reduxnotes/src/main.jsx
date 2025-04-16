import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import noteReducer, { createNote } from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
