import mongoose from 'mongoose';
import type { BorrowRequest } from '../types';

const borrowRequestSchema = new mongoose.Schema<BorrowRequest>({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'RETURNED'],
    default: 'PENDING'
  }
}, { timestamps: true });

export const BorrowRequestModel = mongoose.model<BorrowRequest>('BorrowRequest', borrowRequestSchema);
