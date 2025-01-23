// models/Book.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
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
  status: "available" | "taken";
  cover?: {
    small?: string;
    medium?: string;
    large?: string;
  };
}

const BookSchema: Schema = new Schema({
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
  status: { type: String, enum: ["available", "taken"], default: "available" },
  cover: {
    small: { type: String },
    medium: { type: String },
    large: { type: String },
  },
});

export default mongoose.model<IBook>("Book", BookSchema);
