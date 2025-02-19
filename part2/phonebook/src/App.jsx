import { useState, useEffect } from "react"

import Notification from "./components/Notification";
import personService from './services/persons';
import './index.css';

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
    <form onSubmit={props.onSubmit} className="formControls">
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
    <ul className="numbersList">
      {props.names.map(person => <li key={person.id}>
          {person.name} ({person.number})
          <span>
            <button onClick={() => props.onClick(person)}>delete</button>
          </span>
        </li>)}
    </ul>
  )
}

const App = () => {
  const defaultMessage = { text: null, success: true };

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [actionMessage, setActionMessage] = useState(defaultMessage)

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

        const newMessage = { text: `Added ${returnedPerson.name}`, success: true }
        setActionMessage(newMessage);
        setTimeout(() => {
          setActionMessage(defaultMessage);
        }, 4000);
      })
    }
  }

  const deleteName = (personObject) => {
    if (window.confirm(`Delete ${personObject.name}?`)) {
      personService.delete(personObject.id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id));

          const newMessage = { text: `Deleted ${returnedPerson.name}`, success: true }
          setActionMessage(newMessage);
          setTimeout(() => {
            setActionMessage(defaultMessage);
          }, 4000);
        })
    }
  }

  const updateNumber = (newObject) => {
    const messageConfirm = `${newObject.name} is already added to the phonebook, replace old number with the new one?`;

    if (window.confirm(messageConfirm)) {
      const filteredPerson = persons.find(person => person.name === newObject.name);
      
      personService.update(filteredPerson.id, newObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === filteredPerson.id 
            ? returnedPerson : person));
          setNewName('');
          setNewNumber('');

          const newMessage = { text: `Updated ${returnedPerson.name}'s number to (${returnedPerson.number})`, success: true }
          setActionMessage(newMessage);
          setTimeout(() => {
            setActionMessage(defaultMessage);
          }, 4000);
        }).catch(error => {
          const newMessage = { text: `Information of ${newObject.name} has already been removed from the server`, success: false }
          setActionMessage(newMessage);
          setTimeout(() => {
            setActionMessage(defaultMessage);
          }, 4000);
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
      <br />
      <Notification 
        actionPerformed={actionMessage} />

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
