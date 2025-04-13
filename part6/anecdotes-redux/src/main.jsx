import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App.jsx'
import anecdoteReducer from './reducers/anecdoteReducer.js'

const store = createStore(anecdoteReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
