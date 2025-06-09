const persons = require('express').Router()
const Person = require('../models/person')

// get persons
persons.get('/', (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

// get person by id
persons.get('/:id', (request, response, next) => {
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

// delete person with id
persons.delete('/:id', (request, response, next) => {
  const { id } = request.params

  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(result)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// add new person
persons.post('/', (request, response, next) => {
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

// update person with id
persons.put('/:id', (request, response, next) => {
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

module.exports = persons
