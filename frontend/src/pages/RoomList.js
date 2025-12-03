import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function RoomList({ userId }) {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => { fetchRooms(); }, []);
  const fetchRooms = async () => { const res = await API.get('/chat/rooms', { headers: { 'x-user-id': userId } }); setRooms(res.data); };
  const createRoom = async () => { const res = await API.post('/chat/rooms', { roomName: name }, { headers: { 'x-user-id': userId } }); setRooms(prev => [...prev, res.data]); setName(''); };

  return (
    <div className="p-4">
      <h2 className="text-xl">Rooms</h2>
      <div className="my-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New room name" className="p-2 border mr-2" />
        <button onClick={createRoom} className="px-3 py-1 bg-blue-600 text-white">Create</button>
      </div>
      <ul>
        {rooms.map(r => (
          <li key={r._id} className="mb-2"><Link to={`/rooms/${r._id}`} className="text-blue-700">{r.roomName}</Link></li>
        ))}
      </ul>
    </div>
  );
}
