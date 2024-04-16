const { users, events } = require('../models/tempData');
const { User, Event } = require('../models/index');

const resolvers = {
    Query: {
        // -- USER QUERIES -- // 
        users: async () => {
            // return users;
            try {
                const users = await User.find({});
                return users;
            } catch (err) {
                console.error(err);
                return
            }
        },
        user: async (parent, args, context) => {
            console.log("Args: ", args);
            // const foundUser = users.find(user => user.email == args.email);
            // console.log("User: ", foundUser);
            // return foundUser;

            const user = await User.findOne({ email: args.email });
            console.log("Found: ", user);
            return user;
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
        events_created: (parent, args, context) => {
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
        // addUser: (parent, { username, email, password }, context) => {
        addUser: async (parent, args, context) => {
            // const newUser = {
            //     _id: users.length + 1,
            //     username,
            //     email,
            //     password,
            //     created_events: []
            // }
            // users.push(newUser);
            // return newUser;

            try {
                const newUser = await User.create(args)
                console.log("User: ", newUser);
                return newUser;
            } catch(err) {
                console.error(err);
                return 
            }
            
        },
        removeUser: async (parent, { _id }, context) => {
            // const userToBeRemoved = users.findIndex(user => user._id == _id);
            // console.log("Idx: ", userToBeRemoved);
            // if(userToBeRemoved == -1) { 
            //     return { msg: "No user found" };
            // }
            // users.splice(userToBeRemoved, 1);
            
            // console.log('Users After: ', users);
            // // return users;   
            // return { msg: "User Removed" };
            try {      
                const user = await User.findByIdAndDelete(_id);
                console.log("Removing: ", user);
                return { msg: "User Removed" }
            } catch (error) {
                console.error(err);
                return 
            }
        },
        updateUser: (parent, args, context) => {
            console.log("Args: ", args);
            // let updateIdx;
            // const foundUser = users.find((user, idx) => {
            //     updateIdx = idx;
            //     return user.email == args.email
            // });
            if(!foundUser) { 
                console.log("No user found");
                return { msg: "No user found"};
            }

            console.log("Found: ", foundUser);
            
            // let updatedUser = {...foundUser, ...args};
            // console.log("User: ", updatedUser);
            
            // users.splice(updateIdx, 1, updatedUser);
            // console.log("Users: ", users);
            // // return updatedUser;
            // return { msg: "User Updated"}
        },
        // -- EVENT MUTATIONS -- //
        addEvent: (parent, args, context) => {
            console.log("Args: ", args);
            return { msg: "Event Created" }
        } ,
        addNewEvent: (parent, args, context) => {
            return { msg: "New Event Created"}
        }
    }
}

module.exports = resolvers;