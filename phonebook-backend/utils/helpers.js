/** @format */

const mongoose = require('mongoose')
const {
  Types: { ObjectId },
} = mongoose

const isValidObjectId = (id) =>
  ObjectId.isValid(id) && new ObjectId(id).toString() === id

module.exports = { isValidObjectId }
