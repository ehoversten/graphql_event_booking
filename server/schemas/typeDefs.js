
const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        events_created: [Event]
        events_attending: [Booking]
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float
        date: String
        time: String
        isBooked: Boolean
        max_attendance: Int
        creator: User
        to_attend: [User]
    }

    type Booking {
        _id: ID!
        userId: User
        eventId: Event
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
        time: String!
        max_attendance: Int!
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

        newBooking(eventId: ID!): Message!
        cancelBooking(eventId: ID!): Message!

        login(loginInput: LoginInput!): Auth
        register(userInput: UserInput!): Auth
    }
`

module.exports = typeDefs;