import { useState } from 'react'

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

const Persons = ({ persons }) => (
  <div>{persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if ((persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length === 0 )) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
