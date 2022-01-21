import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    const names = persons.map(person => person.name)

    names.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : personService
          .create(newPerson)
          .then(returnedNumber => {
            setPersons(persons.concat(returnedNumber))
          })
      
    setNewName('')
    setNewNumber('')
    
  }

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
   <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilterChange} value={filter} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        adder={addPerson}
      />
      <h3>Numbers</h3>
        <Persons persons={personsToShow} removalMethod={deletePerson}/>
   </div>
  )
}

export default App