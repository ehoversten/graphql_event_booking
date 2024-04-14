
const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        events: [Event]   
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: String
        date: String
        userId: ID
    }

    type Message {
        msg: String!
        err: String
    }

    type Query {
        users: [User]
        user(email: String!): User
        events: [Event]
        event(_id: ID!): Event
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String): User
        removeUser(_id: ID!): Message
        updateUser(username: String, email: String): Message
    }
`

module.exports = typeDefs;