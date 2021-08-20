import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Create database scheme for notes
 */
const AppointmentSchema = new Schema({
    stylist: {
        type: mongoose.ObjectId,
        required: true,
    },

    stylistName: {
        type: String,
        required: true,
    },

    userName: {
        type: String,
        default: null,
    },

    user: {
        type: mongoose.ObjectId,
        default: null,
    },

    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: false,
        default: 'Appointment',
    },
    category: {
        type: String,
        required: false,
        default: 'haircut',
    },
    location: {
        type: String,
        required: false,
        default: 'Home',
    },
    pending: {
        type: Boolean,
        default: true,
    },
    canceled: {
        type: Boolean,
        default: false,
    },
    allday: {
        type: Boolean,
        required: false,
        default: false,
    },
});

export default mongoose.model('Appointment', AppointmentSchema);
