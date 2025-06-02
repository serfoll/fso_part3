/** @format */

const express = require("express");
const app = express();
app.use(express.json());

const helpers = require("./utils/helpers");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// get /
app.get("/", (request, response) => {
  response.send("<h1>Phonebook backend api</h1>");
});

// get /info
app.get("/info", (request, response) => {
  const requestTime = new Date();
  const personsTotal = persons.length;
  const info = `<div>
    <p>Phonebook has info for ${personsTotal} people</p>
    <p>${requestTime}</p>
  </div>`;
  response.send(info);
});

// get /api/persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// get /api/persons/:id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p?.id === id);

  if (person) {
    console.log(person);
    response.json(person);
  } else {
    response.statusMessage = `No person with id`;
    response.status(404).end();
  }
});

// delete /api/persons/:id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p?.id !== id);

  console.log(persons);
  response.status(204).end();
});

// post /api/persons
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = {
    id: helpers.generateId(persons),
    name: body.name,
    number: body.number,
  };

  console.log(person);
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(
    `App is running on port: ${PORT}, with url: http://localhost:${PORT}`
  );
});
