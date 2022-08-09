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
  await mongoose.connect('mongodb://127.0.0.1:12345/person_test', {useNewUrlParser: true})

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

  const query = gql`
    query Person {
      person(id: "1dd75fce-1a02-42ad-b321-00e1301c2cc1") {
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
  expect(result.data.person.id).toBe('1dd75fce-1a02-42ad-b321-00e1301c2cc1')
})

test('person function includes expected manager', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query Person {
      person(id: "e371d011-f48c-4a76-abbe-a3df9a57e84c") {
        id
        firstName
        lastName
        jobTitle
        manager {
          id
          firstName
          lastName
          jobTitle
        }
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.person.manager.id).toBe("4af1baa3-aaeb-4fcf-96eb-5d2db0be644f")
})

test('person function includes expected number of subordinates', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query Person {
      person(id: "46956d54-093b-47c0-9c15-e1c512e0c155") {
        id
        firstName
        lastName
        jobTitle
        subordinates {
          id
          firstName
          lastName
          jobTitle
        }
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.person.subordinates.length).toBe(4)
})

//Close the database connection when complete
afterAll(async () => {
  await mongoose.connection.close()
})
