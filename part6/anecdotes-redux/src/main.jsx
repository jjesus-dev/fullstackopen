import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import App from './App.jsx'
import anecdoteReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)
console.log('store:', store.getState())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
