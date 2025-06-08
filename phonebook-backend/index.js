/** @format */

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();
app.use(express.static("dist"));
app.use(express.json());

const helpers = require("./utils/helpers");

morgan.token("reqData", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return " ";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqData"
  )
);

// get /
app.get("/", (request, response) => {
  response.send("<h1>Phonebook App</h1>");
});

// get /info
app.get("/info", (request, response) => {
  const requestTime = new Date();

  Person.find({}).then((result) => {
    const people = result.length;
    const info = `<div>
    <p>Phonebook has info for ${people} people</p>
    <p>${requestTime}</p>
  </div>`;
    response.send(info);
  });
});

// get /api/persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

// get /api/persons/:id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const isValidId = helpers.isValidObjectId(id);

  if (!isValidId) {
    return response.status(400).json({
      error: "id not valid",
    });
  }

  Person.findById(id).then((person) => {
    response.json(person);
  });
});

// delete /api/persons/:id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const isValidId = helpers.isValidObjectId(id);

  if (!isValidId) {
    return response.status(400).json({
      error: "id not valid",
    });
  }

  Person.findByIdAndDelete(id).then((result) => {
    console.log(result);
    response.status(204).end();
  });
});

// post /api/persons
app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  Person.exists({ name: name }).then((foundPerson) => {
    if (foundPerson) {
      return response.status(400).json({
        error: "name must be unique",
      });
    }

    const person = new Person({
      name: name,
      number: number,
    });
    person.save().then((savedPerson) => {
      response.json(savedPerson);
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
