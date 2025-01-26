// models/Reservation.js
import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    days: [Date],
    name: String,
    phone: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);