import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text}: {props.value}</p>
  )
}

const Statistics = (props) => {
  let statsData = (
    <>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </>
  )

  if (props.total > 0) {
    const avgGood = props.good * 1;
    const avgBad = props.bad * -1;
    const newAverage = (avgGood + avgBad) / props.total;

    const positivePercent = (props.good / props.total) * 100;

    statsData = (
      <>
        <h2>Statistics</h2>
        <StatisticLine text={'Good'} value={props.good} />
        <StatisticLine text={'Neutral'} value={props.neutral} />
        <StatisticLine text={'Bad'} value={props.bad} />
        <StatisticLine text={'All'} value={props.total} />

        <StatisticLine text={'Average'} value={newAverage} />
        <StatisticLine text={'Positive'} value={positivePercent} />
      </>
    )
  }

  return (
    <>
      {statsData}
    </>
  )
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
        <Statistics good={good} neutral={neutral} bad={bad}
          total={all} />
      </div>
    </>
  )
}

export default App
