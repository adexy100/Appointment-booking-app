const mongoose = require ('mongoose');

const ConfirmBookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserBooking'
    },
    createdAt: {
       type: Date,
       default: Date.now
    },
}, 
	{
	   timestamp: true
});

const ConfirmBooking = mongoose.model('ConfirmBooking', ConfirmBookingSchema);
export default ConfirmBooking;