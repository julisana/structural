const {model, Schema} = require('mongoose')

/**
 * List of fields in the MongoDB collection. Does not necessarily correspond to the fields defined in the GraphQL Schema
 *
 * Example document:
 * {
 *   "id": "920a774e-617a-4a5b-82ea-8205c18eef75"
 *   "name": "Engineering",
 * }
 */
const departmentSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = model('Department', departmentSchema)
