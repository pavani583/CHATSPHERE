const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createRoom, getRooms, getMessagesForRoom, getPrivateMessages } = require('../controllers/chatController');

router.post('/rooms', auth, createRoom);
router.get('/rooms', auth, getRooms);
router.get('/rooms/:roomId/messages', auth, getMessagesForRoom);
router.get('/private/:otherUserId/messages', auth, getPrivateMessages);

module.exports = router;