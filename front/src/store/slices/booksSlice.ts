import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  courseName: string;
  degreeName: string;
  author: string;
  location: string;
  isbn: string;
  userId: string; // To associate the book with a user
}

interface Filters {
  courseNumber: string;
  bookName: string;
  location: string;
  degreeName: string;
}

interface BooksState {
  books: Book[]; // All books in the system
  filters: Filters; // Filters for general search
}

const initialState: BooksState = {
  books: [
    {
      id: '1',
      title: 'Introduction to Algorithms',
      courseName: 'CS101',
      degreeName: 'Computer Science',
      author: 'Thomas H. Cormen',
      location: 'Library Shelf 5',
      isbn: '9780262033848',
      userId: 'dasd123', // Example user ID
    },
    {
      id: '2',
      title: 'Clean Code',
      courseName: 'CS102',
      degreeName: 'Software Engineering',
      author: 'Robert C. Martin',
      location: 'Library Shelf 7',
      isbn: '9780132350884',
      userId: 'user456', // Another user ID
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
    // Add a new book to the system
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },

    // Set filters for searching books
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Fetch books for a specific user
    fetchUserBooks: (state, action: PayloadAction<string>) => {
      // This reducer is not necessary for Redux Toolkit because selectors handle this
      // If needed, use it for async operations to fetch user-specific books
    },
  },
});

// Selector to get all books for a specific user
export const selectUserBooks = (state: BooksState, userId: string) =>
  state.books.filter((book) => book.userId === userId);

// Selectors to access general filters
export const selectFilters = (state: BooksState) => state.filters;

// Export actions and reducer
export const { addBook, setFilters } = booksSlice.actions;
export default booksSlice.reducer;
