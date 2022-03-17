import { useState } from 'react'

const Button = ( {onClick, text} ) => <button onClick={onClick}>{text}</button>

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
      <h1>statistics</h1>
      <p>good {feedback.good}</p>
      <p>neutral {feedback.neutral}</p>
      <p>bad {feedback.bad}</p>


    </div>
  )
}

export default App