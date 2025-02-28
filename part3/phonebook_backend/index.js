const express = require('express');
const app = express();

let numbers = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
    response.send('<p>Phone numbers</p>');
})

app.get('/info', (request, response) => {
    const count = numbers.length;
    const now = new Date();
    const message = `<p>Phonebook has info for ${count} people</p><br /><p>${now.toString()}</p>`;

    response.send(message);
})

app.get('/api/persons', (request, response) => {
    response.json(numbers);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})