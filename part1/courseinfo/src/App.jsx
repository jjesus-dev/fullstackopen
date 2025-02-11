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
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  }, {
    name: 'Using props to pass data',
    exercises: 7
  }, {
    name: 'State of a component',
    exercises: 14
  }]

  return (
    <div>
      <Header courseTitle={course}/>
      <Content part1={parts[0]}
        part2={parts[1]}
        part3={parts[2]} />
      <Total exercises1Count={parts[0].exercises} 
        exercises2Count={parts[1].exercises} 
        exercises3Count={parts[2].exercises}/>
    </div>
  )
}

export default App
