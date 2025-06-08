/** @format */

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('reqData', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ' '
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqData'
  )
)

// entrypoint
app.get('/', (response) => {
  response.send('<h1>Phonebook App</h1>')
})

// get /info
app.get('/info', (request, response) => {
  const requestTime = new Date()

  Person.find({}).then((result) => {
    const people = result.length
    const info = `<div>
    <p>Phonebook has info for ${people} people</p>
    <p>${requestTime}</p>
  </div>`
    response.send(info)
  })
})

// get /api/persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

// get /api/persons/:id
app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// delete /api/persons/:id
app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(result)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// post /api/persons
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }

  if (!number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }

  Person.exists({ name: name }).then((foundPerson) => {
    if (foundPerson) {
      return response.status(400).json({
        error: 'name must be unique',
      })
    }

    const person = new Person({
      name: name,
      number: number,
    })

    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson)
      })
      .catch((error) => next(error))
  })
})

// put /api/persons/:id
app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  const { name, number } = request.body

  Person.findById(id)
    .then((person) => {
      if (!person) return response.status(404).end()

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => response.json(updatedPerson))
    })
    .catch((error) => next(error))
})

// unknownEndpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// errorHandler
const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
