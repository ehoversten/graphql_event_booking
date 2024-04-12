const users = require('../models/tempData');

const resolvers = {
    Query: {
        users: () => {
            return users;
        }
    },
    // Mutation: {}
}

module.exports = resolvers;