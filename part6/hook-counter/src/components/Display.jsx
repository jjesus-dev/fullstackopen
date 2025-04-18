import { useContext } from "react";
import CounterContext from "../CounterContext";

const Display = () => {
  const [counter] = useContext(CounterContext)
  return (
    <h1>Counter: {counter}</h1>
  )
}

export default Display