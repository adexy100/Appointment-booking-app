const mongoose = require ('mongoose');
const validator = from ('validator');

const UserBookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, 'Your name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    reference_id: {
        type: String,
        unique: true,
        required: [true, "reference id is required."],
        lowercase: true,
        index: true,
        trim: true,
        minlength: 4,
        maxlength: 10,
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please enter your phone number'],
         validate: {
            validator: function(v) {
                return /d{11}/.test(v);
            },
            message: '{VALUE} is not a valid 11 digit number!'
        }
    },
    address: {
        type: String,
        required: [true, 'Please enter your home address'],
        maxLength: [100, 'Your name cannot exceed 100 characters']
    },
    event: {
        type: String,
        required: [true, 'Please enter event type'],
        enum: {
            values: [
                'Birthday',
                'Wedding',
                'Introduction',
                'Office',
            ],
            message: 'Please select correct category for event'
        }
    }, 
    preference: {
        type: String,
        required: true,
        default: 'Standard'
        enum: ['Standard', 'Premium', 'Casual']
    }, 
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking'
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const UerBooking = mongoose.model('UerBooking', UerBookingSchema);
export default UerBooking;