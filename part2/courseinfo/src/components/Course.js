import React from "react";

const Header = ({text}) => <h3>{text}</h3>

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

export default Course
