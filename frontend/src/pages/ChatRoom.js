import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import ChatBubble from '../components/ChatBubble';
import FileUpload from '../components/FileUpload';
import { SocketContext } from '../context/SocketContext';
import { encrypt } from '../utils/encrypt';
import { useParams } from 'react-router-dom';

export default function ChatRoom({ userId }) {
  const socket = useContext(SocketContext);
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => { fetchMessages(); if (!socket) return; socket.on('new-message', (m) => { if (m.room === roomId) setMessages(prev => [...prev, m]); }); return () => socket.off('new-message'); }, [socket, roomId]);

  const fetchMessages = async () => {
    const res = await API.get(`/chat/rooms/${roomId}/messages`, { headers: { 'x-user-id': userId } });
    setMessages(res.data);
  };

  const send = async () => {
    if (!text.trim()) return;
    const enc = encrypt(text);
    socket.emit('send-message', { sender: userId, roomId, text: enc });
    setText('');
    // Optimistic UI push
    setMessages(prev => [...prev, { sender: userId, room: roomId, text: enc, createdAt: new Date() }]);
  };

  const onFileUploaded = (fileUrl) => {
    socket.emit('send-message', { sender: userId, roomId, text: '', file: fileUrl });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Room Chat</h2>
      <div className="h-96 overflow-auto border p-2">
        {messages.map((m, i) => <ChatBubble key={i} m={m} isMine={m.sender === userId} />)}
      </div>
      <div className="flex items-center mt-2">
        <input className="flex-1 p-2 border" value={text} onChange={(e)=>setText(e.target.value)} />
        <button onClick={send} className="px-3 py-2 bg-blue-600 text-white ml-2">Send</button>
      </div>
      <div className="mt-2"><FileUpload onUploaded={onFileUploaded} /></div>
    </div>
  );
}