const Message = require('../models/Message');
const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const { roomName } = req.body;
  const room = new Room({ roomName, createdBy: req.user._id, users: [req.user._id] });
  await room.save();
  res.json(room);
};

exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.getMessagesForRoom = async (req, res) => {
  const { roomId } = req.params;
  const messages = await Message.find({ room: roomId }).sort('createdAt');
  res.json(messages);
};

exports.getPrivateMessages = async (req, res) => {
  const { otherUserId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: otherUserId },
      { sender: otherUserId, receiver: req.user._id }
    ]
  }).sort('createdAt');
  res.json(messages);
};