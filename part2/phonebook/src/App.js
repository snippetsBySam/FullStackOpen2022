import { useState, useEffect } from 'react'
import phoneservice from './services/phonebook'

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
  <div>{persons.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => remove(person.id)}>remove</button> </div>)}</div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

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
    if ((persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length === 0 )) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phoneservice
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log(error))
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const removePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id)
    // Check if person to remove exists
    if (Object.keys(personToRemove).length > 0) {
      // confirm person to remove
      if (window.confirm(`Delete ${personToRemove.name}?`)) {
        const updatedPersons = persons.filter(person => person.id !== id)
        console.log('remove', personToRemove);
        phoneservice
          .remove(id)
          .then(response => {
            setPersons(updatedPersons)
            console.log(response)
          })
          .catch(error => console.log(error))
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
