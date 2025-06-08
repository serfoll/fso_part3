/** @format */

const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to db')
  })
  .catch((error) => console.error('connection to db failed', error.message))

const personSchema = new mongoose.Schema({
  name: {
    minLength: 3,
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: (props) => {
        const msg = `Path (${props.path}) (${props.value})`

        return props.value.split('-').join('').length < 8
          ? `${msg} is shorter than the minimum allowed length (8).`
          : `${msg} is not a valid number, must be format (111-111-1111)`
      },
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
