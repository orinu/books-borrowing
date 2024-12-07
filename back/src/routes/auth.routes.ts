import express from 'express';
import * as authService from '../services/auth.service';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json({ data: result });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
