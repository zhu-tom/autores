import mongoose from 'mongoose';
import { ACCOUNT_TYPE } from '../util/types';

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    default: ACCOUNT_TYPE.UNPAID,
  }
});

const User = mongoose.Model("User", userSchema);

export default User;