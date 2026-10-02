import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';

const router = Router();
router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields are required' });
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' });
  await Message.create({ name, email, message });
  res.status(201).json({ ok: true });
});
export default router;
