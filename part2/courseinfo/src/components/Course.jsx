const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

const Header = (props) => <h2>{props.course.name}</h2>

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part part={part} key={part.id} />)}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises);
  // to calculate the sum of values in an array
  const totalExercises = exercises.reduce(
    (total, current) => total + current, 0);

  return (
    <p><strong>Total of {totalExercises} exercises</strong></p>
  )
}

export default Course