import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types/Book";

interface Book {
  id: string;
  title: string;
  courseName: string;
  author: string;
  location: string;
  isbn: string;
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [
    {
      id: "1",
      title: "Introduction to Algorithms",
      courseName: "CS101",
      author: "Thomas H. Cormen",
      location: "Library Shelf 5",
      isbn: "9780262033848",
    },
  ],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
  },
});

export const { addBook, borrowBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;
