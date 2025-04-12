import { createRoot } from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducers/countReducer'

const store = createStore(counterReducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  return (
    <div>
      <button onClick={good}>Good</button>
      <button>Ok</button>
      <button>Bad</button>
      <button>Reset stats</button>
      <div>Good {store.getState().good}</div>
      <div>Ok</div>
      <div>Bad</div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)