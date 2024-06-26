const { Schema, model } = require('mongoose');
// -- Define Schema -- //
const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: false
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false
        },
        max_attendance: { 
            type: Number,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }, 
        to_attend: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// create isFull virtual(?)

const Event = model('Event', eventSchema);


module.exports = Event;