const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { prisma } = require('./src/generated/prisma-client')
const typeDefs = require('./src/schema');
const Query = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
const User = require('./src/resolvers/User')
const Link = require('./src/resolvers/Link')

const resolvers = {
  Query,
  Mutation,
  User,
  Link
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      request: request.req,
      prisma,
    }
  },
})

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);