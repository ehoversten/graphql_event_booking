const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    },
    {
        timestamps: true
    }
);

const Booking = model('Booking', bookingSchema);


module.exports = Booking;