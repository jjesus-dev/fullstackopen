require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Note = require('./models/note');

let notes = [];

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('----');

    next();
}

app.use(express.json());
app.use(express.static('dist'));
app.use(requestLogger);
app.use(cors());

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown Endpoint' });
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({ error: 'malformed id' });
        })
})

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (body.content === undefined) {
        return response.status(400).json({
            error: "content is missing"
        })
    }

    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false
    })

    note.save().then(savedNote => {
        response.json(savedNote);
    })

})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
})

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
