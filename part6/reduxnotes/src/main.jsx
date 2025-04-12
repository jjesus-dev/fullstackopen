import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
