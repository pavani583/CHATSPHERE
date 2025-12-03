const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  isVerified: { type: Boolean, default: false },
  profilePic: { type: String },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  otp: { code: String, expiresAt: Date }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);