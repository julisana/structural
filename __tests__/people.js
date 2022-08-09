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
  await mongoose.connect('mongodb://127.0.0.1:12345/people_test', {useNewUrlParser: true})

  //Seed the database
  await Department.deleteMany({})
  await Department.insertMany(departmentData)

  await Person.deleteMany({})
  await Person.insertMany(peopleData)
})

test('people function returns 100 out of 100 results', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query People {
      people {
        id
        firstName
        lastName
        jobTitle
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.people.length).toBe(100)
})

test('people function limit to 14 results', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query People {
      people(limit: 14) {
        id
        firstName
        lastName
        jobTitle
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.people.length).toBe(14)
})

const testData = {
  firstName: {value: 'Casper', count: 1},
  lastName: {value: 'McKenzie', count: 1},
  jobTitle: {value: 'CEO', count: 1},
  departmentId: {value: 'aef293ee-8dcc-4d89-99cf-1b8f61bab07b', count: 14},
  managerId: {value: '1dd75fce-1a02-42ad-b321-00e1301c2cc1', count: 0}
}
for (let fieldName of Object.keys(testData)) {
  test('people function search for ' + fieldName, async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const query = `
      query People {
        people(${fieldName}: "${testData[fieldName].value}") {
          id
          firstName
          lastName
          jobTitle
        }
      }
    `
    const result = await testServer.executeOperation({
      query: query,
      variables: {}
    })

    expect(result.errors).toBeUndefined()
    expect(result.data.people.length).toBe(testData[fieldName].count)
  })
}

//Close the database connection when complete
afterAll(async () => {
  await mongoose.connection.close()
})
