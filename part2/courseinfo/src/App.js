const Header = ({text}) => <h1>{text}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Total = (props) => {
  return (
    <>
      <p><b>total of {props.parts.reduce((accumulator,currentValue) => accumulator + currentValue.exercises, 0)} exercises</b></p>
    </>
  )

}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App