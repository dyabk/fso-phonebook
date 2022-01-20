import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
      : axios
          .post('http://localhost:3001/persons', newPerson)
          .then(response => {
            setPersons(persons.concat(newPerson))
          })
      
    setNewName('')
    setNewNumber('')
    
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
    : persons.filter(person => person.name.toLowerCase().includes(filter))
  
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
        <Persons persons={personsToShow} />
   </div>
  )
}

export default App