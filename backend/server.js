require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const connectDB = require('./db'); //FIXED PATH

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const User = require('./models/User');
const Message = require('./models/Message');
const Room = require('./models/Room');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// simple multer setup to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ fileUrl: `/uploads/${req.file.filename}` });
});

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Socket.io events
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // when a user joins, they emit 'join' with userId
  socket.on('join', async ({ userId }) => {
    socket.userId = userId;
    // optional: set status online
    try {
      const user = await User.findById(userId);
      if (user) {
        user.status = 'online';
        await user.save();
      }
    } catch (e) { console.error(e); }
  });

  socket.on('join-room', ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on('leave-room', ({ roomId }) => {
    socket.leave(roomId);
  });

  socket.on('send-message', async (payload) => {
    // payload: { sender, roomId?, receiver?, text, file }
    try {
      const msg = new Message({ sender: payload.sender, room: payload.roomId || null, receiver: payload.receiver || null, text: payload.text, file: payload.file || null });
      await msg.save();
      if (payload.roomId) {
        io.to(payload.roomId).emit('new-message', msg);
      } else if (payload.receiver) {
        // emit to both users if they are connected
        io.emit('new-private-message', msg); // simple broadcast; frontend filters
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', async () => {
    try {
      if (socket.userId) {
        const user = await User.findById(socket.userId);
        if (user) {
          user.status = 'offline';
          await user.save();
        }
      }
    } catch (e) { console.error(e); }
    console.log('Socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 8080;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/chatsphere')
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
