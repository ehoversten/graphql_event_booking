const { users, events } = require('../models/tempData');
const { User, Event, Booking } = require('../models/index');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const resolvers = {
    Query: {
        // -- USER QUERIES -- // 
        users: async () => {
            // return users;
            try {
                const users = await User.find({})
                                        .populate('events_created')
                                        .populate('events_attending');
                // console.log("Users: ", users);
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
                                    .populate('events_created')
                                    .populate('events_attending');
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
        events: async (parent, args, context) => {
            // console.log("context: ", context);
            console.log("context data: ", context.user);
            if(!context.user) {
                console.log("No User Authorized");
                // return { msg: "Please Log In" }
            }
            // return events;
            try {
                const events = await Event.find()
                                          .populate('creator')
                                          .populate('to_attend');
                // console.log("Events: ", events);
                return events;
            } catch (error) {
                console.log("erorr: ", error);
                // throw Error(error);
                return { msg: "Error", err: error };
            }
        },  
        event: async (parent, { _id }, context) => {
         //  console.log("context: ", context);
            console.log("user: ", context.user);
            // console.log("context: ", context.body);
            // const foundEvent = events.find(event => event._id == args._id);
            // return foundEvent;
            
            try {
                const foundEvent = await Event.findById(_id)
                                              .populate('creator')
                                              .populate('to_attend');
                return foundEvent;
            } catch (error) {
                return { msg: "Error", err: error };
            }
        },
        // -- BOOKING QUERIES -- // 
        bookings: async (parent, args, context) => {
            console.log("Running BOOKINGS query");
            console.log("CONTEXT: ", context.user)

            try {
                const allBookings = await Booking.find()
                                                .populate('userId')
                                                .populate('eventId');
                console.log("Found: ", allBookings);
                return allBookings;
            } catch (error) {
                console.log("Server Error: ", error);
                return { msg: "Error", err: error };
            }
        },
        booking: async (parent, { _id }, context) => {
            try {
                const booking = await Booking.findById(_id)
                                            .populate('userId')
                                            .populate('eventId');
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
            console.log('Context: ', context.user);
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
        addNewEvent: async (parent, { eventInput }, context) => {
            console.log("Args: ", eventInput);
            console.log("Context: ", context.user);
            
            try {
                const { title, description, price, date, time, max_attendance } = eventInput;
                const templateEvent = {
                    title: title,
                    description: description,
                    price: price,
                    date: date,
                    time: time,
                    max_attendance: max_attendance,
                    creator: context.user._id
                }
                 const newEvent = await Event.create(templateEvent);
                 const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { events_created: newEvent }},
                    { new: true }
                 )
                console.log("Created: ", newEvent);
                console.log("Updated: ", updatedUser);
                // console.log("Doc: ", newEvent._doc);
                // return newEvent;
                return { msg: "New Event Created", err: null}
            } catch (error) {
                console.log("Error: ", error);
                // throw Error(error);
                return { msg: "Error", err: error };
            }
        },
        removeEvent: async (parent, { _id }, context) => {
            console.log("User: ", context.user)
            if(!context.user) {
                return { msg: "No User Authorized" }
            }
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
        newBooking: async (parent, { eventId }, context) => {
            console.log("Context: ", context.user)
            const userId = context.user._id
            if(!context.user) throw new GraphQLError("No User Authorized");

            // Check Event -> max_attendance == to_attend.length (?)
            //      - update isBooked --> TRUE
            //      - add User --> to_attend
            // Create New Booking
            // Add New Booking to User -> events_attending

            try {
                const checkEvent = await Event.findById(eventId);
                console.log("Found Event: ", checkEvent);
                // validate 
                if(checkEvent.isBooked || checkEvent.max_attendance == checkEvent.to_attend.length) {
                    throw new GraphQLError("Event is already booked!")
                }
                // Create Booking Instance
                const newBooking = await Booking.create({ userId: userId, eventId: eventId });
                console.log("New Booking: ", newBooking);
                // -- Associate other Models -- //
                // Update User --> events_attending
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { events_attending: newBooking._id }},
                    { new: true}
                );
                console.log("Updated User: ", updatedUser)

                // Update Event --> to_attend
                let updatedEvent = await Event.findByIdAndUpdate(
                    { _id: eventId },
                    { $addToSet: { to_attend: context.user._id }},
                    { new: true }
                )
                // Check to update --> isBooked
                if(updatedEvent.to_attend.length == checkEvent.max_attendance) {
                    updatedEvent = await Event.findByIdAndUpdate(
                        { _id: eventId },
                        { $set: { isBooked: true } },
                        { new: true }
                    )
                }
                console.log("Updated Event: ", updatedEvent);
                    // --- OR --- (Q. Which is better methodology(?)) // 
                
                // Find Event by Id
                // Find User by Id
                // Create Booking Instance
                // const bookingData = await Booking.findById(newBooking._id)
                //                                     .populate('userId')
                //                                     .populate('eventId');

                // return bookingData;
                // return newBooking
                return { msg: "Booking Confirmed", err: null};
            } catch (error) {
                console.log("error: ", error);
                return { msg: "Error", err: error};
            }
        },
        cancelBooking: async (parent, { eventId }, context) => {
            console.log("Booking to Cancel: ", eventId);

            // Check Booking -> does it exist(?)
            //      - update Event - isBooked --> FALSE
            //      - update Event --> to_attend - remove userId ref
            //      - update User --> events_attending - remove bookingId ref
            // Delete Booking

            try {
                const foundBooking = await Booking.findById(eventId)
                                                    .populate('userId')
                                                    .populate('eventId');
                console.log("Booking to delete: ", foundBooking)
                if(!foundBooking) {
                    throw new GraphQLError('No Booking Found')
                }

                const updatedEvent = await Event.findByIdAndUpdate(
                    { _id: eventId },
                    { $pull: { to_attend: foundBooking.userId._id } },
                    { $set: { isBooked: false } },
                    { new: true }
                )
                console.log("Updated Event: ", updatedEvent);
                
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: foundBooking.userId._id },
                    { $pull: { events_attending: foundBooking.eventId._id } },
                    { new: true }
                )
                console.log("Updated User: ", updatedUser);

                await Booking.findByIdAndDelete(eventId);
                console.log("Booking cancelled");
                return { msg: "Booking cancelled", err: null }
                // return foundBooking;
                // return { msg: "Booking cancelled", err: error }
            } catch (error) {
                console.log("Cancelling Error: ", error);
                return { msg: "Booking cancelled", err: error }
            }
        },
        // -- AUTHORIZATION MUTATIONS -- //
        login: async (_, { loginInput }, context) => {
            console.log("input data: ", loginInput );

            try {
                // find user in database
                const foundUser = await User.findOne({ email: loginInput.email });
                if(!foundUser) {
                    throw new GraphQLError("User not found");
                }
                // validate password
                const isValid = await foundUser.isCorrectPassword(loginInput.password);
                if(!isValid) {
                    throw new GraphQLError("User not Authorized");
                }
                // create a token to return with the User instance

                const token = jwt.sign({ data: { 
                                          _id: foundUser._id, 
                                          username: foundUser.username, 
                                          email: foundUser.email,  
                                        }}, process.env.SECRET, { expiresIn: '1h' });
                console.log('Token: ', token);
                
                return { token, user: foundUser }

            } catch (error) {
                console.log("Error: ", error)
                throw new GraphQLError("Login Error");
            }
        },
        register: async (_, { userInput }, context) => {
            // console.log(args);
            console.log(userInput);
            try {
                const user = await User.findOne({ email: userInput.email});
                if(user) {
                    throw new GraphQLError("User with that email already exists");
                }
                const newUser = await User.create(userInput);
                // console.log("New User: ", newUser);
                const payload = { 
                                   _id: newUser._id,
                                   username: newUser.username, 
                                   email: newUser.email,
                                //    password: userInput.password
                                }
    
                const token = jwt.sign({ data: payload }, process.env.SECRET, { expiresIn: '1h' })
                console.log("Token: ", token);
    
                return { token, user: newUser };
            } catch (error) {
                console.log("Error: ", error)
                throw new GraphQLError("Registration Error");
            }
        } 
    }
}   
        
module.exports = resolvers;