const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const baseRouter = require('./controllers/base')
const personsRouter = require('./controllers/persons')

const app = express()

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => logger.error(`connection to db failed ${error.message}`))

morgan.token('reqData', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ' '
})

// express middlewares
app.use(express.static('dist'))
app.use(express.json())

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqData'
  )
)

//routers
app.use('/', baseRouter)
app.use('/api/persons', personsRouter)

// loggers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
