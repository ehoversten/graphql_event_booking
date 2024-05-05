const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        eventId: {
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