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
  await mongoose.connect('mongodb://127.0.0.1:12345/department_test', {useNewUrlParser: true})

  await Department.deleteMany({})
  await Department.insertMany(departmentData)

  await Person.deleteMany({})
  await Person.insertMany(peopleData)
})

test('department function returns expected result', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const query = gql`
    query Department {
      department(id: "cfd90465-28fa-4b9a-be3e-ef2517e987e9") {
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
  expect(result.data.department.id).toBe('cfd90465-28fa-4b9a-be3e-ef2517e987e9')
})

test('department function includes expected number of employees', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })
  const query = gql`
    query Department {
      department(id: "cfd90465-28fa-4b9a-be3e-ef2517e987e9") {
        id
        name
        employees {
          id
        }
      }
    }
  `
  const result = await testServer.executeOperation({
    query: query,
    variables: {}
  })

  expect(result.errors).toBeUndefined()
  expect(result.data.department.employees.length).toBe(21)
})

//Close the database connection when complete
afterAll(async () => {
  await mongoose.connection.close()
})
