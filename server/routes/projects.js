import { Router } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import sample from '../sample.js';

const router = Router();
const dbUp = () => mongoose.connection.readyState === 1;

router.get('/', async (_req, res) => {
  if (!dbUp()) return res.json(sample);
  res.json(await Project.find().sort('order'));
});
router.post('/', async (req, res) => {
  if (!dbUp()) return res.status(503).json({ error: 'Database not connected' });
  res.status(201).json(await Project.create(req.body));
});
export default router;
