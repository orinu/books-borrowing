// src/store/slices/booksSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Book interface
export interface Book {
  _id: string;
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

// Define the form data interface
interface FormData {
  title: string;
  courseName: string;
  degreeName: string;
  author: string;
  location: string;
  isbn: string;
  cover?: {
    small?: string;
    medium?: string;
    large?: string;
  };
}

// Define filters (if needed)
interface Filters {
  courseNumber: string;
  bookName: string;
  location: string;
  degreeName: string;
}

// Define the initial state interface
interface BooksState {
  books: Book[];
  filters: Filters;
  loading: boolean;
  error: string | null;
}

// Base API URL from environment variables
const API_URL = "http://localhost:3000";

// Thunk to fetch all books
export const fetchAllBooks = createAsyncThunk<Book[], void>(
  "books/fetchAllBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/books`, {
        withCredentials: true, // Include cookies if needed
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch books"
      );
    }
  }
);

// Thunk to add a new book
export const addNewBook = createAsyncThunk<
  Book,
  FormData,
  { rejectValue: string }
>("books/addNewBook", async (bookData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/books`,
      {
        ...bookData,
        status: "available",
      },
      {
        withCredentials: true, // Include cookies if needed
      }
    );
    return response.data.book;
  } catch (error: any) {
    console.error("Error adding book:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to add new book"
    );
  }
});

// Thunk to update book status
export const updateBookStatus = createAsyncThunk<
  { id: string; status: "available" | "taken" },
  { id: string; status: "available" | "taken" },
  { rejectValue: string }
>(
  "books/updateBookStatus",
  async (args, { rejectWithValue }) => {
    const { id, status } = args;
    try {
      const response = await axios.put(
        `${API_URL}/api/books/${id}`,
        {
          status,
        },
        {
          withCredentials: true, // Include cookies if needed
        }
      );
      return { id, status: response.data.status };
    } catch (error: any) {
      console.error("Error updating book status:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update book status"
      );
    }
  }
);

// Initial state
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

// Create the slice
export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
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
      // Fetch all books
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.error = null;
        state.books = action.payload
          .filter((book) => !!book._id)
          .map((book) => ({
            ...book,
            id: book._id,
            cover: book.cover,
          }));
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      // Add new book
      .addCase(addNewBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.loading = false;
        state.books.push({
          ...action.payload,
          id: action.payload._id,
          cover: action.payload.cover,
        });
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add new book";
      })
      // Update book status
      .addCase(updateBookStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const book = state.books.find((b) => b.id === id);
        if (book) {
          book.status = status;
        }
      })
      .addCase(updateBookStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { setFilters, toggleBookStatus } = booksSlice.actions;

// Export reducer
export default booksSlice.reducer;
