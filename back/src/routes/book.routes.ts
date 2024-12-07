import express from 'express';
import * as bookService from '../services/book.service';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/available', auth, async (req, res) => {
  try {
    const books = await bookService.getAvailableBooks(req.query.search as string);
    res.json({ data: books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const book = await bookService.addBook(req.user!.userId, req.body.isbn);
    res.status(201).json({ data: book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const books = await bookService.getMyBooks(req.user!.userId);
    res.json({ data: books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
