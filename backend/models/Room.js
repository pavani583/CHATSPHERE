const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
module.exports = mongoose.model('Room', RoomSchema);