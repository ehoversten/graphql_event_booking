const { users, events } = require('../models/tempData');

const resolvers = {
    Query: {
        // -- USER QUERIES -- // 
        users: () => {
            return users;
        },
        user: (parent, args, context) => {
            console.log("Args: ", args);
            const foundUser = users.find(user => user.email == args.email);
            console.log("User: ", foundUser);
            return foundUser;
        },
        // -- EVENT QUERIES -- // 
        events: () => {
            return events;
        },
        event: (parent, args, context) => {

            const foundEvent = events.find(event => event._id == args._id);
            return foundEvent;
        }
    },
    User: {
        events: (parent, args, context) => {
            console.log("Parent: ", parent);
            console.log("Args: ", args);
            const foundEvents = events.filter(event => {
                return event.userId == parent._id;
            })
            console.log("Found: ", foundEvents);
            return foundEvents;
        }
    },
    Mutation: {
        // -- USER MUTATIONS -- //
        addUser: (parent, { username, email, password }, context) => {
            const newUser = {
                _id: users.length + 1,
                username,
                email,
                password,
                events: []
            }
            
            users.push(newUser);
            return newUser;
        },
        removeUser: (parent, { _id }, context) => {
            const userToBeRemoved = users.findIndex(user => user._id == _id);
            console.log("Idx: ", userToBeRemoved);
            if(userToBeRemoved == -1) { 
                return { msg: "No user found" };
            }
            users.splice(userToBeRemoved, 1);
            
            console.log('Users After: ', users);
            // return users;   
            return { msg: "User Removed" };
        },
        updateUser: (parent, args, context) => {
            console.log("Args: ", args);
            let updateIdx;
            const foundUser = users.find((user, idx) => {
                updateIdx = idx;
                return user.email == args.email
            });
            if(!foundUser) { 
                console.log("No user found");
                return { msg: "No user found"};
            }

            console.log("Found: ", foundUser);
            
            let updatedUser = {...foundUser, ...args};
            console.log("User: ", updatedUser);
            
            users.splice(updateIdx, 1, updatedUser);
            console.log("Users: ", users);
            // return updatedUser;
            return { msg: "User Updated"}
        }
        // -- EVENT MUTATIONS -- //

    }
}

module.exports = resolvers;