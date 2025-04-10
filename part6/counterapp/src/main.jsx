import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from "redux"

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <>
      <div>Count is {store.getState()}</div>
      <div>
        <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
          Plus
        </button>
        <button onClick={e => store.dispatch({ type: 'ZERO' })}>
          Zero
        </button>
        <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
          Minus
        </button>
      </div>
    </>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

renderApp()
store.subscribe(renderApp)
