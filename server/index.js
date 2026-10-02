import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import projects from './routes/projects.js';
import contact from './routes/contact.js';

const app = express();
// CLIENT_URL can hold several origins separated by commas, e.g. your Vercel URL and custom domain.
const origins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((o) => o.trim().replace(/\/$/, ''));
app.use(cors({ origin: origins }));
app.use(express.json());
app.get('/', (_req, res) => res.send('Portfolio API is running'));
app.use('/api/projects', projects);
app.use('/api/contact', contact);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.error('MongoDB error:', e.message));
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
