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
            type: String,
            required: false
        },
        date: {
            type: Date,
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


const Event = model('Event', eventSchema);


module.exports = Event;