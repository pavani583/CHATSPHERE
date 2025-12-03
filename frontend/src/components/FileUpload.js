import React from 'react';
import API from '../api';

export default function FileUpload({ onUploaded }) {
  const upload = async (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    const res = await API.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    onUploaded(res.data.fileUrl);
  };
  return <input type="file" onChange={upload} />;
}
