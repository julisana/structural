const {model, Schema} = require('mongoose')

/**
 * List of fields in the MongoDB collection. Does not necessarily correspond to the fields defined in the GraphQL Schema
 *
 * Example document:
 * {
 *    "id": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d",
 *    "firstName": "Asia",
 *    "lastName": "Streich",
 *    "jobTitle": "Dynamic Branding Orchestrator",
 *    "departmentId": "aef293ee-8dcc-4d89-99cf-1b8f61bab07b",
 *    "managerId": "2798c35b-5b8f-4a5d-9858-0a818d48cbef"
 * }
 */
let personSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true
  },
  departmentId: {
    type: String,
    required: false
  },
  managerId: {
    type: String,
    required: false
  }
})

module.exports = model('Person', personSchema)
