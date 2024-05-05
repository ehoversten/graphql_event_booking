const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// -- Define Schema -- //
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use valid email address']
        },
        password: {
            type: String,
            required: true
        },
        events_created: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
        events_attending: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Booking'
            }
        ],
        // bookings: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Booking'
        //     }
        // ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);
// -- Hash Password -- //
userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const salt = 10;
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// -- Custom Methods -- // 
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};
// -- Virtual Fields -- //

const User = model('User', userSchema);


module.exports = User;