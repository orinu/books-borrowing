import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  courseName: string;
  degreeName: string;
  author: string;
  location: string;
  isbn: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  status: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  courseName: { type: String, required: true },
  degreeName: { type: String, required: true },
  author: { type: String, required: true },
  location: { type: String, required: true },
  isbn: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  userEmail: { type: String, required: true },
  status: { type: String, default: 'available' },
});

export default mongoose.model<IBook>('Book', bookSchema);
