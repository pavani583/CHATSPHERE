import React from 'react';
import { decrypt } from '../utils/encrypt';

export default function ChatBubble({ m, isMine }) {
  return (
    <div className={`max-w-md my-2 p-2 rounded ${isMine ? 'ml-auto bg-blue-100' : 'bg-gray-100'}`}>
      {m.file && <img src={`${process.env.REACT_APP_API_URL?.replace('/api','') || 'http://localhost:5000'}${m.file}`} alt="file" className="max-h-40 mb-2" />}
      <div>{decrypt(m.text)}</div>
      <div className="text-xs mt-1">{new Date(m.createdAt).toLocaleString()}</div>
    </div>
  );
}
