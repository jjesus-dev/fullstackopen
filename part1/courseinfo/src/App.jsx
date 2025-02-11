const Header = (props) => {
  return (
    <>
      <h1>{props.courseTitle}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>{props.part1Title}: {props.exercises1Count}</p>

      <p>{props.part2Title}: {props.exercises2Count}</p>

      <p>{props.part3Title}: {props.exercises3Count}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises: {props.exercises1Count + props.exercises2Count + props.exercises3Count}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header courseTitle={course}/>
      <Content part1Title={part1} exercises1Count={exercises1}
        part2Title={part2} exercises2Count={exercises2}
        part3Title={part3} exercises3Count={exercises3} />
      <Total exercises1Count={exercises1} 
        exercises2Count={exercises2} 
        exercises3Count={exercises3}/>
    </div>
  )
}

export default App
