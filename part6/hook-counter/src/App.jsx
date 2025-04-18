import { useReducer } from 'react'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

function App() {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <>
      <h1>Counter: {counter}</h1>
      <div>
        <button onClick={() => counterDispatch({ type: 'INC' })}>+</button>
        <button onClick={() => counterDispatch({ type: 'ZERO' })}>0</button>
        <button onClick={() => counterDispatch({ type: 'DEC' })}>-</button>
      </div>
    </>
  )
}

export default App
