import mongoose from 'mongoose';
import { BOOKING_STATE } from '../util/types';

const bookingSchema = new mongoose.Schema({
  timeSlotId: {
    type: Number,
    required: true,
  },
  clubId: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  state: {
    type: Number,
    required: true,
    default: BOOKING_STATE.PENDING
  }
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);