import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
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

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const namesToShow = persons.filter(
    person => person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <div>Filter shown with: 
          <input type="text" id="personFilter"
            value={newFilter}
            onChange={handleFilterChange} />
        </div>
      </div>
      
      <div>
        <h2>Add a new person</h2>
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
          {namesToShow.map(person => <li key={person.id}>
            {person.name} ({person.number})</li>)}
        </ul>
      </div>

    </>
  )
}

export default App
