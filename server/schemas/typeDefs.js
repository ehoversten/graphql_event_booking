
const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: String
        date: String
    }

    type Query {
        users: [User]
        user(email: String!): User
        events: [Event]
        event(_id: ID!): Event
    }

    # type Mutation {}
`

module.exports = typeDefs;