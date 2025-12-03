import React, { useState } from 'react';
import API from '../api';

export default function Login({ setUserId }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [stage, setStage] = useState(0);
  const [userIdLocal, setUserIdLocal] = useState('');
  const [otp, setOtp] = useState('');

  const requestOtp = async () => {
    const res = await API.post('/auth/request-otp', { phone, name });
    setUserIdLocal(res.data.userId);
    setStage(1);
    alert('OTP printed on server console (dev mode)');
  };

  const verify = async () => {
    const res = await API.post('/auth/verify-otp', { userId: userIdLocal, otp });
    localStorage.setItem('userId', res.data.userId);
    setUserId(res.data.userId);
    window.location.href = '/rooms';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 w-full max-w-md">
        {stage === 0 ? (
          <div>
            <h2 className="text-2xl mb-4">Login with Phone (OTP)</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full mb-2 p-2 border" />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="w-full mb-2 p-2 border" />
            <button onClick={requestOtp} className="px-4 py-2 bg-blue-600 text-white">Request OTP</button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Enter OTP</h2>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP" className="w-full mb-2 p-2 border" />
            <button onClick={verify} className="px-4 py-2 bg-green-600 text-white">Verify</button>
          </div>
        )}
      </div>
    </div>
  );
}