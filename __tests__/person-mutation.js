const {gql, ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

//Data Seeds
const departmentData = require('../seeds/departments')
const peopleData = require('../seeds/people')

//Apollo Components
const typeDefs = require('../typeDefs')
const resolvers = require('../resolvers')

//Mongoose Models
const Department = require('../models/department')
const Person = require('../models/person')

beforeAll(async () => {
  //Use a unique database for each test suite
  await mongoose.connect('mongodb://127.0.0.1:12345/person_mutation_test', {useNewUrlParser: true})

  //Seed the database
  await Department.deleteMany({})
  await Department.insertMany(departmentData)

  await Person.deleteMany({})
  await Person.insertMany(peopleData)
})

test('person function returns expected result', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  let query = gql`
    query Person {
      person(id: "b7e29a6d-3586-4c11-8573-e9e283b94280") {
        id
        firstName
        lastName
        jobTitle
      }
    }
  `
  const beforeResult = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(beforeResult.errors).toBeUndefined()
  expect(beforeResult.data.person.lastName).toBe('Howell')

  query = gql`
    mutation UpdatePerson($id: String!, $personInput: PersonInput) {
      update_person(id: $id, personInput: $personInput) {
        id
        firstName
        lastName
        jobTitle
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {id: 'b7e29a6d-3586-4c11-8573-e9e283b94280', personInput: {lastName: 'Location'}}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.update_person.firstName).toBe('Geo')
  expect(result.data.update_person.lastName).toBe('Location')
})

//Close the database connection when complete
afterAll(async () => {
  await mongoose.connection.close()
})
