const express = require('express');
const path = require('path');
// Import Apollo Server Class
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Create a new instance of an Express Server
const app = express();

// Create a new instance of an Apollo Server using our GraphQL Schema
const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    // Define the Server Endpoint --> Plug Apollo into Express
    app.use('/graphql', expressMiddleware(server))

    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    })
}


startApolloServer();