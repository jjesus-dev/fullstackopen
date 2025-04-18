import { useCounterValue } from "../CounterContext"

const Display = () => {
  const counter = useCounterValue()
  return (
    <h1>Counter: {counter}</h1>
  )
}

export default Display