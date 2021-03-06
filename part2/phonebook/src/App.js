import { useState, useEffect } from 'react'

import phoneservice from './services/phonebook'
import Notification from './components/Notification'

const Filter = ({value, onChange}) => (
  <div>
    filter shown with <input
                        value={value}
                        onChange={onChange}
                      />
  </div>
)

const PersonForm = (props) => (
  <form>
    <div>
      name: <input
              value={props.name}
              onChange={props.onNameChange}
            />
    </div>
    <div>
      number: <input
                value={props.number}
                onChange={props.onNumberChange}
              />
    </div>
    <div>
      <button type="submit" onClick={props.onSubmit}>add</button>
    </div>
  </form>
)

const Persons = ({ persons, remove }) => (
  <div>{persons.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => remove(person.id)}>delete</button> </div>)}</div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phoneservice
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => console.log(error))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    // search for person being added in persons list
    const result = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    // ask to update if theres was a result
    if (result && Object.keys(result).length > 0) {
      if(window.confirm(`${result.name} is already added to phonebook, replace old number with new one?`)) {
        phoneservice
          .update(result.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === result.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setMessage({
              text: `Updated ${newPerson.name}`,
              status: 'success'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            // Display error message
            setMessage({
              text: `Information of ${newPerson.name} has already been removed from server`,
              status: 'error'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            // remove missing person from front end
            setPersons(persons.filter(person => person.id !== result.id))
          })
      }
    }
    // if person doesn't exist, and a name was provided
    else if (newPerson.name) {
      phoneservice
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage({
            text: `Added ${newPerson.name}`,
            status: 'success'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => console.log(error))
    }
  }

  const removePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id)
    // Check if person to remove exists
    if (Object.keys(personToRemove).length > 0) {
      // confirm person to remove
      if (window.confirm(`Delete ${personToRemove.name}?`)) {
        const updatedPersons = persons.filter(person => person.id !== id)
        //console.log('remove', personToRemove);
        phoneservice
          .remove(id)
          .then(response => {
            setPersons(updatedPersons)
            setMessage({
              text: `Removed ${personToRemove.name}`,
              status: 'success'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            //console.log(response)
          })
          .catch(error => {
            // Display error message
            setMessage({
              text: `Information of ${personToRemove.name} has already been removed from server`,
              status: 'error'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            // remove missing person from front end
            setPersons(persons.filter(person => person.id !== personToRemove.id))
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const personsToShow = personFilter
    ? persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={personFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} remove={removePerson}/>
    </div>
  )
}

export default App
