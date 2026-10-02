import 'dotenv/config';
import mongoose from 'mongoose';
import Project from './models/Project.js';
import sample from './sample.js';

await mongoose.connect(process.env.MONGO_URI);
await Project.deleteMany();
await Project.insertMany(sample.map(({ _id, ...p }, i) => ({ ...p, order: i })));
console.log('Seeded');
process.exit();
