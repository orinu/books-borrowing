import mongoose from 'mongoose';
import type { Book } from '../types';

const bookSchema = new mongoose.Schema<Book>({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  imageUrl: String,
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export const BookModel = mongoose.model<Book>('Book', bookSchema);
