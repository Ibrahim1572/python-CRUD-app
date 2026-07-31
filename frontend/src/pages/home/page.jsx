import { useEffect, useState } from 'react';

function HomePage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // This calls http://127.0.0 via the proxy
    fetch('/api/test') 
      .then(res => res.json())
      .then(data => setMessage(data.message || 'Connected!'))
      .catch(() => setMessage('Failed to connect to Flask backend'));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Frontend Status</h1>
      <p>Backend Response: <strong>{message}</strong></p>
    </div>

  );
}

export default HomePage;
