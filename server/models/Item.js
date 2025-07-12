const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // URLs or file paths
  category: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'shirt', 'pants', etc.
  size: { type: String, required: true },
  condition: { type: String, required: true },
  tags: [{ type: String }],
  status: { type: String, enum: ['available', 'swapped', 'pending'], default: 'pending' },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema); 