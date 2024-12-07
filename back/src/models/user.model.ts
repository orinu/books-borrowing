import mongoose from 'mongoose';
import type { User } from '../types';

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
}, { timestamps: true });

export const UserModel = mongoose.model<User>('User', userSchema);
