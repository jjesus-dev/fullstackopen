import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addName = (event) => {
    event.preventDefault();
    const personObject = { 
      name: newName,
      number: newNumber
    }

    if (checkDuplicates(newName)) {
      const messageTemplate = `${newName} already exists, choose another one.`;
      alert(messageTemplate);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const checkDuplicates = (personName) => {
    const namesList = persons.map(person => person.name);
    const personExists = namesList.includes(personName);

    return personExists;
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            Name: <input type="text" id="personName"
              value={newName}
              onChange={handleNameChange} />
          </div>
          <div>
            Number: <input type="text" id="personNumber"
              value={newNumber}
              onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name}>
            {person.name} ({person.number})</li>)}
        </ul>
      </div>

    </>
  )
}

export default App
