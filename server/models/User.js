const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  points: { type: Number, default: 100 },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// models/User.js
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // <<< THIS IS WHERE THE HASHING HAPPENS
  }
  next();
});
module.exports = mongoose.model('User', userSchema);
