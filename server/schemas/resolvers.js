const { users, events } = require('../models/tempData');
const { User, Event, Booking } = require('../models/index');

const resolvers = {
    Query: {
        // -- USER QUERIES -- // 
        users: async () => {
            // return users;
            try {
                const users = await User.find({}).populate('events_created');
                console.log("Users: ", users);
                return users;
            } catch (err) {
                console.error(err);
                // return null
                return { msg: "Error", err: err };
            }
        },
        user: async (parent, args, context) => {
            console.log("Args: ", args);
            // const foundUser = users.find(user => user.email == args.email);
            // console.log("User: ", foundUser);
            // return foundUser;
            try {
                const user = await User
                                    .findOne({ email: args.email })
                                    .populate('events_created');
                console.log("Found: ", user);
                // console.log("Ver: ", user.__v);
                // console.log("Doc: ", user._doc);
                return user;
            } catch (error) {
                console.log("erorr: ", error);
                // throw Error(error);
                return { msg: "Error", err: error };
            }
        },
        // -- EVENT QUERIES -- // 
        events: async () => {
            // return events;
            try {
                const events = await Event.find();
                console.log("Events: ", events);
                return events;
            } catch (error) {
                console.log("erorr: ", error);
                // throw Error(error);
                return { msg: "Error", err: error };
            }
        },  
        event: async (parent, { _id }, context) => {
            
            // const foundEvent = events.find(event => event._id == args._id);
            // return foundEvent;
            
            try {
                const foundEvent = await Event.findById(_id);
                return foundEvent;
            } catch (error) {
                return { msg: "Error", err: error };
            }
        },
        // -- BOOKING QUERIES -- // 
        bookings: async (parent, args, context) => {
            try {
                const allBookings = await Booking.find()
                                                .populate('user')
                                                .populate('event');
                return allBookings;
            } catch (error) {
                return { msg: "Error", err: error };
            }
        },
        booking: async (parent, { _id }, context) => {
            try {
                const booking = await Booking.findById(_id)
                                            .populate('user')
                                            .populate('event');
                return booking;
            } catch (error) {
                return { msg: "Error", err: error };
            }
        },
    },
    // User: {
        //     events_created: (parent, args, context) => {
            //         console.log("Parent: ", parent);
            //         // console.log("Args: ", args);
            //         const foundEvents = events.filter(event => {
    //             return event.userId == parent._id;
    //         })
    //         console.log("Found: ", foundEvents);
    //         return foundEvents;
    //     }
    // },
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
                return { msg: "Error", err: error };
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
                return { msg: "Error", err: error };
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
        addEvent: async (parent, args, context) => {
            console.log("Args: ", args);
            // return { msg: "Event Created" }
            try {
                const newEvent = await Event.create(args);
                const updateUser = await User.findOneAndUpdate(
                    { _id: args.creator },
                    { $addToSet: { events_created: newEvent._id } },  // add new events but not duplicates
                    { new: true }
                    )
                console.log("Created: ", newEvent);
                console.log("User Data: ", updateUser);
                return newEvent;
            } catch (error) {
                console.log("Error: ", error);
                // throw Error(error);
                return { msg: "Error", err: error };
            }
        },
        addNewEvent: async (parent, args, context) => {
            console.log("Args: ", args);
            try {
                const newEvent = await Event.create(args.eventInput);
                console.log("Created: ", newEvent);
                console.log("Doc: ", newEvent._doc);
                // return newEvent;
                return { msg: "New Event Created", err: null}
            } catch (error) {
                console.log("Error: ", error);
                // throw Error(error);
                return { msg: "Error", err: error };
            }
        },
        removeEvent: async (parent, { _id }, context) => {
            try {
                const removingEvent = await Event.findById(_id);
                console.log("Event to Remove: ", removingEvent)
                const updateUser = await User.findByIdAndUpdate(
                    { _id: removingEvent.creator }, 
                    { $pull: { events_created: { _id } } },
                    { new: true })
                console.log("User: ", updateUser);
                await Event.findByIdAndDelete(_id);
                return { msg: "Event Removed"}
            } catch (error) {
                console.log("error: ", error);
                return { msg: "Error", err: JSON.stringify(error)};
            }
            
        },
        updateEvent: async (parent, args, context) => {
            try {
                const updateEvent = await Event.findByIdAndUpdate(args._id, ...args, { new: true });
                /* const updateEvent = await Event.findByIdAndUpdate(
                    { _id: args._id }, 
                    { $set: args}, 
                    { runValidators: true, new: true }); */
                } catch (error) {
                    console.log("error: ", error);
                    return { msg: "Error", err: error};
                }
        },
        // -- BOOKING MUTATIONS -- //
        newBooking: async (parent, { userId, eventId }, context) => {
            try {
                // Create Booking Instance
                const newBooking = await Booking.create({ user: userId, event: eventId });
                console.log("New Booking: ", newBooking);
                // Associate other Models
                
                // --- OR --- (Q. Which is better methodology(?)) // 
                
                // Find Event by Id
                // Find User by Id
                // Create Booking Instance
                const bookingData = await Booking.findById(newBooking._id)
                                                    .populate('user')
                                                    .populate('event');
                return bookingData;
                // return { msg: "Booking Confirmed", err: null};
            } catch (error) {
                console.log("error: ", error);
                return { msg: "Error", err: error};
            }
        },
        cancelBooking: async (parent, { eventId }, context) => {
            try {
                const foundBooking = await Booking.findById(eventId)
                                                    .populate('user')
                                                    .populate('event');
                console.log("Booking to delete: ", foundBooking)
                await Booking.findByIdAndDelete(eventId);
                console.log("Booking cancelled");
                // return { msg: "Booking cancelled", err: null }
                return foundBooking;
                // return { msg: "Booking cancelled", err: error }
            } catch (error) {
                console.log("Cancelling Error: ", error);
                return { msg: "Booking cancelled", err: error }
            }
        }
    }
}   
        
module.exports = resolvers;