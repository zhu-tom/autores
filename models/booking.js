import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  timeSlotId: {
    type: String,
    required: true,
  },
  clubId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  }
})