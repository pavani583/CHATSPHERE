import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RoomList from './pages/RoomList';
import ChatRoom from './pages/ChatRoom';
import { SocketProvider } from './context/SocketContext';

export default function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  return (
    <BrowserRouter>
      <SocketProvider userId={userId}>
        <Routes>
          <Route path="/" element={<Login setUserId={setUserId} />} />
          <Route path="/rooms" element={<RoomList userId={userId} />} />
          <Route path="/rooms/:roomId" element={<ChatRoom userId={userId} />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}