import mongoose from 'mongoose';
export default mongoose.model('Project', new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  link: String,
  order: { type: Number, default: 0 },
}, { timestamps: true }));
