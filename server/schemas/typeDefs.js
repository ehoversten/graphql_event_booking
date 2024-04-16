
const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        events_created: [Event]   
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float
        date: String
        creator: ID
    }

    type Message {
        msg: String!
        err: String
    }

    input UserInput {
        email: String!
        password: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float
        date: String!
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

        addNewEvent(eventInput: EventInput!): Message
        addEvent(title: String!, description: String!, price: Float, date: String!): Message
    }
`

module.exports = typeDefs;