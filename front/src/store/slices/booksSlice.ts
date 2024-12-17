import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  courseName: string;
  degreeName: string; // New field
  author: string;
  location: string;
  isbn: string;
}

interface Filters {
  courseNumber: string;
  bookName: string;
  location: string;
  degreeName: string;
}

interface BooksState {
  books: Book[];
  filters: Filters;
}

const initialState: BooksState = {
  books: [
    {
      id: '1',
      title: 'Introduction to Algorithms',
      courseName: 'CS101',
      degreeName: 'Computer Science', // Added example
      author: 'Thomas H. Cormen',
      location: 'Library Shelf 5',
      isbn: '9780262033848',
    },
  ],
  filters: {
    courseNumber: '',
    bookName: '',
    location: '',
    degreeName: '',
  },
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { addBook, setFilters } = booksSlice.actions;
export default booksSlice.reducer;
