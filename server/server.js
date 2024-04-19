const express = require('express');
const path = require('path');
// Import Apollo Server Class
const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const jwt = require('jsonwebtoken');

const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,  
})

// Create a new instance of an Express Server
const app = express();

// Create a new instance of an Apollo Server using our GraphQL Schema
const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    // Define the Server Endpoint --> Plug Apollo into Express
    app.use('/graphql', expressMiddleware(server, {
        context: async ({req, res}) => {
            // Get the user token from the headers.
            let token = req.headers.authorization || req.query.token || '';
            // console.log("Token: ", token);

            if(req.headers.authorization) {
                token = token.split(' ')[1];
            }

            if(!token) {
                return req
            }

            console.log("Token: ", token);
            try {
                const isValid = jwt.verify(token, process.env.SECRET, { maxAge: '1h' });
                console.log("Auth: ", isValid);
                req.user = isValid.data;
            } catch (error) {
                console.log("Context Error: ", error);
                console.log("Invalid Token");
            }

            return req;
        }
    }))

    db.once('open', () => {
        console.log("Database Connected...");
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        })
    })
}


startApolloServer();