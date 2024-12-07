import { BookModel } from '../models/book.model';
import axios from 'axios';
import type { Book } from '../types';

export const addBook = async (ownerId: string, isbn: string) => {
  const bookInfo = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const bookData = bookInfo.data.items[0].volumeInfo;

  return await BookModel.create({
    ownerId,
    isbn,
    title: bookData.title,
    author: bookData.authors?.join(', ') || 'Unknown',
    imageUrl: bookData.imageLinks?.thumbnail,
    isAvailable: true
  });
};

export const getAvailableBooks = async (search?: string) => {
  const query = { isAvailable: true };
  if (search) {
    Object.assign(query, { $text: { $search: search } });
  }
  return await BookModel.find(query).populate('ownerId', 'name email');
};

export const getMyBooks = async (userId: string) => {
  return await BookModel.find({ ownerId: userId });
};
