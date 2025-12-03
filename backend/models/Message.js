const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
  text: { type: String }, // stored encrypted/base64
  file: { type: String, default: null },
  seen: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Message', MessageSchema);