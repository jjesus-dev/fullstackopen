import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const countGood = () => {
    setGood(good + 1);
  }

  const countNeutral = () => {
    setNeutral(neutral + 1);
  }

  const countBad = () => {
    setBad(bad + 1);
  }

  return (
    <>
      <div>
        <h1>Give us your feedback!</h1>
        <Button onClick={countGood} text={'Good :)'} />
        <Button onClick={countNeutral} text={'Neutral :|'} />
        <Button onClick={countBad} text={'Bad :('} />
      </div>
      <div>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
    </>
  )
}

export default App
