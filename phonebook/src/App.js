import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  )
}

const Filter = (props) => {
  return (
    <div>
      <form>
        filter shown with
        <input value={props.filterdPerson}
          onChange={props.handleChange}
          onKeyDown={props.setFilter} />
      </form>
    </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        <Field label="Name" value={props.newName} handleChange={props.nameChange} />
      </div>
      <div>
        <Field label="Number" value={props.newNumber} handleChange={props.numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

const Field = ({ label, value, handleChange }) => {
  return (
    <label>
      {label}:
      <input value={value}
        onChange={handleChange}
      />
    </label>

  )

}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ])

  const [newName, setNewName] = useState('a new name...')
  const [newNumber, setNewNumber] = useState('a new number...')
  const [filterdPerson, setFilteredPerson] = useState('')
  const [showFiltered, setShowFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    const existingNames = persons.map(person => person.name)

    if (existingNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      console.log(persons)
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilteredPerson(event.target.value)
  }


  const matchingPersons = persons.filter(person => person.name.toLowerCase().includes(filterdPerson.toLowerCase()))
  const personsToShow = showFiltered
    ? persons
    : matchingPersons


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterdPerson={filterdPerson} handleChange={handleFilterChange}
        setFilter={() => setShowFilter} />
      <h2>add a new</h2>
      <Form addName={addName} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h2>Numbers</h2>

      <ul id="persons-list">
        {personsToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul>


    </div>
  )
}

export default App;
