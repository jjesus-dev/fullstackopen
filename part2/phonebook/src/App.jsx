import { useState, useEffect } from "react"
import axios from "axios"

import personService from './services/persons';

const Filter = (props) => {
  return (
    <div>
      Filter shown with: <input type="text"
        id="personFilter"
        value={props.newFilter}
        onChange={props.onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name: <input type="text" id="personName"
          value={props.newName}
          onChange={props.onChangeName} />
      </div>
      <div>
        Number: <input type="text" id="personNumber"
          value={props.newNumber}
          onChange={props.onChangeNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.names.map(person => <li key={person.id}>
          {person.name} ({person.number})
          <span>
            &nbsp;<button onClick={() => props.onClick(person)}>delete</button>
          </span>
        </li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const personsHook = () => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }

  useEffect(personsHook, []);

  const addName = (event) => {
    event.preventDefault();
    const personObject = { 
      name: newName,
      number: newNumber
    }

    if (checkDuplicates(newName)) {
      updateNumber(personObject);
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
    }
  }

  const deleteName = (personObject) => {
    if (window.confirm(`Delete ${personObject.name}?`)) {
      personService.delete(personObject.id)
        .then(returnedPerson => {
          
          setPersons(persons.filter(person => person.id !== returnedPerson.id));
        })
    }
  }

  const updateNumber = (newObject) => {
    const messageTemplate = `${newObject.name} is already added to the phonebook, replace old number with the new one?`;

    if (window.confirm(messageTemplate)) {
      const filteredPerson = persons.find(person => person.name === newObject.name);
      
      personService.update(filteredPerson.id, newObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === filteredPerson.id 
            ? returnedPerson : person));
          setNewName('');
          setNewNumber('');
        })
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
        <Filter newFilter={newFilter} onChange={handleFilterChange} />
      </div>
      
      <div>
        <h2>Add a new person</h2>
        <PersonForm onSubmit={addName}
          newName={newName}
          onChangeName={handleNameChange}
          newNumber={newNumber}
          onChangeNumber={handleNumberChange} />

        <h2>Numbers</h2>
        <Persons names={namesToShow} onClick={deleteName} />
      </div>
    </>
  )
}

export default App
