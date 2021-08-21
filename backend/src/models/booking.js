const mongoose = require ('mongoose');
const timeZone = require ('mongoose-timezone');

const BookingSchema = new mongoose.Schema({
    confirmDate: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserBooking'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, {
        timestamp: true
});

BookingSchema.plugin(timeZone);

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;