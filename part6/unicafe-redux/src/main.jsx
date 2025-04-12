import { createRoot } from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducers/countReducer'

const store = createStore(counterReducer)

const App = () => {
  const count = (action) => {
    switch (action) {
      case 'GOOD':
        store.dispatch({
          type: action
        })
        break;
      case 'BAD':
        store.dispatch({
          type: action
        })
        break;
      case 'OK':
        store.dispatch({
          type: action
        })
        break;
      default:
        store.dispatch({
          type: 'ZERO'
        })
        break;
    }
    
  }

  return (
    <div>
      <button onClick={() => count('GOOD')}>Good</button>
      <button onClick={() => count('OK')}>Ok</button>
      <button onClick={() => count('BAD')}>Bad</button>
      <button onClick={() => count('RESET')}>Reset stats</button>
      <div>Good {store.getState().good}</div>
      <div>Ok {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)