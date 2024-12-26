import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  courseName: string;
  degreeName: string;
  author: string;
  location: string;
  isbn: string;
  userId: string;
  userName: string; // Add user name
  userPhone: string; // Add user phone
  userEmail: string; // Add user email
  status: 'available' | 'taken';
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
      degreeName: 'Computer Science',
      author: 'Thomas H. Cormen',
      location: 'Library Shelf 5',
      isbn: '9780262033848',
      userName: 'user123',
      userId: 'user123',
      userPhone: '123-456-7890',
      userEmail: 'user@example.com',
      status: 'available',
    },
    {
      id: '2',
      title: 'Clean Code',
      courseName: 'CS102',
      degreeName: 'Software Engineering',
      author: 'Robert C. Martin',
      location: 'Library Shelf 7',
      isbn: '9780132350884',
      userId: 'user456',
      userName: 'Orion',
      userPhone: '123-111-7890',
      userEmail: '222@example.com',
      status: 'taken',
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
    toggleBookStatus: (state, action: PayloadAction<{ id: string; newStatus: 'available' | 'taken' }>) => {
      const book = state.books.find((b) => b.id === action.payload.id);
      if (book) {
        book.status = action.payload.newStatus;
      }
    },
  },
});

export const { addBook, setFilters, toggleBookStatus } = booksSlice.actions;
export default booksSlice.reducer;
