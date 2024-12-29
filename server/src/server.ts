import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import User from "./models/User";
import JwtPayload from "./types/types";
import cors from "cors";

const app = express();
const port = 3000;

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Middleware to authenticate user

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
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
app.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { name, email, phone, password } = req.body;

  try {
    const user = new User({ name, email, phone, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, phone: user.phone },
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
    return res.status(500).json({ message: "Error registering user", error });
  }
});


// Login route
app.post("/login", async (req: Request, res: Response): Promise<any> => {
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
});

// Protected route: Get user profile
app.get("/profile", authenticateUser, (req: Request, res: Response): any => {
  const user = req.user;

  return res.json({
    userId: user?.userId,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
  });
});

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
app.post("/logout", (req: Request, res: Response): any => {
  // Clear the auth_token cookie
  res.clearCookie("auth_token", {
    httpOnly: true, // Ensures it's not accessible by JavaScript
    // secure: process.env.NODE_ENV === 'production',  // Secure cookie flag for production
  });

  return res.json({ message: "Logged out successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
