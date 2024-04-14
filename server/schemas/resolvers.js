const { users, events } = require('../models/tempData');

const resolvers = {
    Query: {
        users: () => {
            return users;
        },
        user: (parent, args, context) => {
            console.log("Args: ", args);
            const foundUser = users.find(user => user.email == args.email);
            console.log("User: ", foundUser);
            return foundUser;
        },
        events: () => {
            return events;
        },
        event: (parent, args, context) => {

            const foundEvent = events.find(event => event._id == args._id);
            return foundEvent;
        }
    },
    // Mutation: {}
}

module.exports = resolvers;