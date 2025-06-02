/** @format */

const express = require("express");
const app = express();

const persons = [
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

// Entrypoint
app.get("/", (request, response) => {
  response.send("<h1>Phonebook backend api</h1>");
});

// /info
app.get("/info", (request, response) => {
  const requestTime = new Date();
  const personsTotal = persons.length;
  const info = `<div>
    <p>Phonebook has info for ${personsTotal} people</p>
    <p>${requestTime}</p>
  </div>`;
  response.send(info);
});

// /api/persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// /api/persons/:id
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(
    `App is running on port: ${PORT}, with url: http://localhost:${PORT}`
  );
});
