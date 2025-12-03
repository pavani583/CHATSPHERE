import React, { createContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children, userId }) => {
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
    if (userId) socketRef.current.emit('join', { userId });
    return () => socketRef.current.disconnect();
  }, [userId]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};