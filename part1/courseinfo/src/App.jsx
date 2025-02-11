const Header = (props) => {
  return (
    <>
      <h1>{props.courseTitle}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name}: {props.number}</p>
    </>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part name={props.part1.name} number={props.part1.exercises}/>
      <Part name={props.part2.name} number={props.part2.exercises}/>
      <Part name={props.part3.name} number={props.part3.exercises}/>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseTitle={course}/>
      <Content part1={part1}
        part2={part2}
        part3={part3} />
      <Total exercises1Count={part1.exercises} 
        exercises2Count={part2.exercises} 
        exercises3Count={part3.exercises}/>
    </div>
  )
}

export default App
