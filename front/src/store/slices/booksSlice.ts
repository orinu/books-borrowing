import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Book {
  id: string;
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
  loading: boolean;
  error: string | null;
}

// Thunk to fetch all books
export const fetchAllBooks = createAsyncThunk<Book[], void>(
  "books/fetchAllBooks",
  async (_, { rejectWithValue }) => {
    try {
      // NOTE: if your server is on a different port or domain, update the URL accordingly
      // Also use { withCredentials: true } if needed for cookies
      const response = await axios.get("http://localhost:3000/api/books");
      return response.data;
    } catch (error: any) {
      // Pass the error message to the rejected action
      return rejectWithValue(error.response?.data || "Failed to fetch books");
    }
  }
);

const initialState: BooksState = {
  books: [],
  filters: {
    courseNumber: "",
    bookName: "",
    location: "",
    degreeName: "",
  },
  loading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleBookStatus: (
      state,
      action: PayloadAction<{ id: string; newStatus: "available" | "taken" }>
    ) => {
      const book = state.books.find((b) => b.id === action.payload.id);
      if (book) {
        book.status = action.payload.newStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // The server data might not have an `id` field named "id",
        // but rather "_id". You might want to transform them if needed:
        // e.g.: const transformed = action.payload.map(b => ({ ...b, id: b._id }));
        state.books = action.payload.map((book) => ({
          ...book,
          id: book._id, // copy _id to id
        }));
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });
  },
});

export const { addBook, setFilters, toggleBookStatus } = booksSlice.actions;
export default booksSlice.reducer;
