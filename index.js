const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

//CANNOT BE ON THE VPN OR THIS WILL FAIL
const MONGODB_CONNECT_URL = 'mongodb+srv://interview:password1234@cluster0.lkdfp38.mongodb.net/?retryWrites=true&w=majority'

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

//Initiate the database connection and then point the Apollo server at a port
mongoose.connect(MONGODB_CONNECT_URL, {useNewUrlParser: true}).then(() => {
  console.log('MongoDB connection successful')
  return server.listen({port: 5000})
}).then((response) => {
  console.log(`Server running at ${response.url}`)

  //Turn on query debugging so mongoose queries are output to the terminal
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc)
  })
})
