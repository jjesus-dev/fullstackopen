import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Percentage = ({ total, toCalc, text }) => {
  if (total > 0) {
    const percentage = (toCalc / total) * 100;
    
    return (
      <p>{text}: {percentage} %</p>
    )
  }
  return (<p>{text}: 0 %</p>)
}

const Average = ({ good, bad, total }) => {
  if (total > 0) {
    const avgGood = good * 1;
    const avgBad = bad * -1;
    const newAverage = (avgGood + avgBad) / total;

    return (<p>Average: {newAverage}</p>)
  }

  return (<p>Average: 0</p>)
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const countGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    calcTotal();
  }

  const countNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    calcTotal();
  }

  const countBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    calcTotal();
  }

  const calcTotal = () => {
    const newAll = all + 1;
    setAll(newAll);
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
        <p>All: {all}</p>

        <Average good={good} bad={bad} total={all} />
        <Percentage total={all} toCalc={good} text={'Positive'} />
      </div>
    </>
  )
}

export default App
