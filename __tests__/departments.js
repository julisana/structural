const {gql, ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

//Data Seeds
const departmentData = require('../seeds/departments')

//Apollo Components
const typeDefs = require('../typeDefs')
const resolvers = require('../resolvers')

//Mongoose Models
const Department = require('../models/department')

beforeAll(async () => {
  //Use a unique database for each test suite
  await mongoose.connect('mongodb://127.0.0.1:12345/departments_test', {useNewUrlParser: true})

  //Seed the database
  await Department.deleteMany({})
  await Department.insertMany(departmentData)
})

test('departments function returns 7 out of 7 results', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query Departments {
      departments {
        id
        name
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.departments.length).toBe(7)
})

test('departments function limit to 3 results', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query Departments {
      departments(limit: 3) {
        id
        name
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.departments.length).toBe(3)
})

test('departments function search for name', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query Departments {
      departments(name: "Sales") {
        id
        name
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.departments.length).toBe(1)
})

//Close the database connection when complete
afterAll(async () => {
  await mongoose.connection.close()
})
