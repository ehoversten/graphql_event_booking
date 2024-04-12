// const { gql } = require('@apollo/server');

const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Query {
        users: [User]
    }

    # type Mutation {}
`

module.exports = typeDefs;