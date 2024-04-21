
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
        creator: User
    }

    type Booking {
        _id: ID!
        user: User!
        event: Event!
        createdAt: String!
        udpatedAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Message {
        msg: String!
        err: String
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float
        date: String!
        creator: ID!
    }

    type Query {
        users: [User]
        user(email: String!): User
        events: [Event]
        event(_id: ID!): Event
        bookings: [Booking]
        booking: Booking
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String): User
        removeUser(_id: ID!): Message
        updateUser(username: String, email: String): Message

        addNewEvent(eventInput: EventInput!): Message
        addEvent(title: String!, description: String!, price: Float, date: String!, creator: ID!): Event
        removeEvent(_id: ID!): Message
        updateEvent(_id: ID!): Message

        newBooking(userId: ID, eventId: ID!): Booking!
        cancelBooking(eventId: ID!): Booking!

        login(loginInput: LoginInput!): Auth
        register(userInput: UserInput!): Auth
    }
`

module.exports = typeDefs;