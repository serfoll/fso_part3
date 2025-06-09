const baseRouter = require('express').Router()
const Person = require('../models/person')

// entrypoint
baseRouter.get('/', (response) => {
  response.send('<h1>Phonebook App</h1>')
})

// get /info
baseRouter.get('/info', (request, response) => {
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

module.exports = baseRouter
