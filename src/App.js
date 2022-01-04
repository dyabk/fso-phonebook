import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    const names = persons.map(person => person.name)

    names.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject))
    
    setNewName('')
  }

  const checkName = (array, name) => array.includes(name)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  return (
   <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
         name: <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>)}
      </ul>
   </div>
  )
}

export default App