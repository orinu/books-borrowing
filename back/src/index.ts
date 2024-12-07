import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import 'dotenv/config';

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book-lending')
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(console.error);