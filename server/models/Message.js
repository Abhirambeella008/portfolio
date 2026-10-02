import mongoose from 'mongoose';
export default mongoose.model('Message', new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
}, { timestamps: true }));
