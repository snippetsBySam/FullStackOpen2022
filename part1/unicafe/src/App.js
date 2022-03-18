import { useState } from 'react'

const Button = ( {onClick, text} ) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ( {feedback} ) => {
  const total = feedback.good + feedback.neutral + feedback.bad
  const average = (feedback.good - feedback.bad) / (feedback.good + feedback.neutral + feedback.bad)
  const positive = (feedback.good * 100) / (feedback.good + feedback.neutral + feedback.bad)

  if (total > 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>
          <table>
            <tbody>
              <StatisticLine text="good" value={feedback.good} />
              <StatisticLine text="neutral" value={feedback.neutral} />
              <StatisticLine text="bad" value={feedback.bad} />
              <StatisticLine text="all" value={total} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive + " %"} />
            </tbody>
          </table>
        </div>
        
      </>
    )
  }
  else {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral:0,
    bad: 0
  })

  const handleGood = () => setFeedback({...feedback, good: feedback.good + 1})
  const handleNeutral = () => setFeedback({...feedback, neutral: feedback.neutral + 1})
  const handleBad = () => setFeedback({...feedback, bad: feedback.bad + 1}) 

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics feedback={feedback} />


    </div>
  )
}

export default App
