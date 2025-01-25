// server.ts
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

import User from "./models/User";
import Book from "./models/Book";
import JwtPayload from "./types/types";

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Declare global namespace for Express Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// CORS Origin
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:4;173";

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: CORS_ORIGIN, // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Middleware to authenticate user
const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

// Register route
app.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    const { name, email, phone, password } = req.body;

    try {
      const user = new User({ name, email, phone, password });
      await user.save();

      const token = jwt.sign(
        {
          userId: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Set token as a cookie
      res.cookie("auth_token", token, {
        httpOnly: true, // Ensures the cookie is only accessible by the server
        maxAge: 3600000, // 1 hour expiration
      });

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user", error);
      return res
        .status(500)
        .json({ message: "Error registering user", error });
    }
  }
);

// Login route
app.post(
  "/login",
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Set token as a cookie
      res.cookie("auth_token", token, {
        httpOnly: true, // Ensures the cookie is only accessible by the server
        // secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (requires HTTPS)
        maxAge: 3600000, // 1 hour expiration
      });

      return res.json({ message: "Logged in successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error logging in", error });
    }
  }
);

// Protected route: Get user profile
app.get(
  "/profile",
  authenticateUser,
  (req: Request, res: Response): any => {
    const user = req.user;

    return res.json({
      userId: user?.userId,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    });
  }
);

// Update user details
app.put(
  "/update",
  authenticateUser,
  async (req: Request, res: Response): Promise<any> => {
    const { name, email, phone } = req.body;
    const userId = req.user?.userId;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, phone },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Error updating user", error });
    }
  }
);

// Logout route
app.post(
  "/logout",
  (req: Request, res: Response): any => {
    // Clear the auth_token cookie
    res.clearCookie("auth_token", {
      httpOnly: true, // Ensures it's not accessible by JavaScript
      // secure: process.env.NODE_ENV === 'production',  // Secure cookie flag for production
    });

    return res.json({ message: "Logged out successfully" });
  }
);

// Proxy endpoint to fetch book data by ISBN
app.get("/api/book/:isbn",   async (req: Request, res: Response): Promise<any> => {

  const { isbn } = req.params;
  try {
    const response = await axios.get(
      `https://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`
    );
    const records = response.data.records;

    // Extract the first record (assuming one book per ISBN)
    const recordKey = Object.keys(records)[0];
    const bookRecord = records[recordKey];

    if (!bookRecord) {
      return res.status(404).json({ message: "Book not found" });
    }

    const { data } = bookRecord;

    // Extract cover images
    const cover = data.cover || {};

    // Prepare the response data
    const bookData = {
      title: data.title || "",
      author: data.authors
        ? data.authors.map((author: any) => author.name).join(", ")
        : "",
      location:
        data.publish_places && data.publish_places.length > 0
          ? data.publish_places[0].name
          : "",
      isbn: data.identifiers?.isbn_10?.[0] || "",
      cover: cover, // Include cover images
    };

    res.json(bookData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Open Library" });
  }
});

// Create a new book
// server.ts
app.post(
  "/api/books",
  authenticateUser,
  async (req: Request, res: Response): Promise<any> => {
    try {
      // Extract the book data from request body
      const {
        title,
        courseName,
        degreeName,
        author,
        location,
        isbn,
        status,
        cover, // Extract cover
      } = req.body;

      // Extract user information from req.user
      const userId = req.user?.userId;
      const userName = req.user?.name;
      const userPhone = req.user?.phone;
      const userEmail = req.user?.email;

      if (!userId || !userName || !userPhone || !userEmail) {
        return res.status(400).json({ message: "Invalid user data" });
      }

      // Create a new book instance
      const newBook = new Book({
        title,
        courseName,
        degreeName,
        author,
        location,
        isbn,
        userId,
        userName,
        userPhone,
        userEmail,
        status: status || "available", // default to 'available' if not provided
        cover, // Assign cover
      });

      // Save to DB
      const savedBook = await newBook.save();

      // Send back the saved book or a success message
      return res
        .status(201)
        .json({ message: "Book created successfully", book: savedBook });
    } catch (error) {
      console.error("Error creating book", error);
      return res.status(500).json({ message: "Error creating book", error });
    }
  }
);


// Get all books
app.get(
  "/api/books",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const books = await Book.find();
      return res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      return res.status(500).json({ message: "Error fetching books", error });
    }
  }
);

// Update book status
app.put(
  "/api/books/:id",
  authenticateUser,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params; // Book ID from URL
      const { status } = req.body; // 'available' or 'taken'

      // Validate that status is one of the allowed statuses
      if (!["available", "taken"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // Find the book first
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Check if the user is authorized to update the book
      if (book.userId !== req.user?.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Update the book's status
      book.status = status;
      const updatedBook = await book.save();

      return res.json(updatedBook); // return the updated book
    } catch (error) {
      console.error("Error updating book status:", error);
      return res
        .status(500)
        .json({ message: "Error updating book status", error });
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
