import { useCallback, useEffect, useState } from 'react';

export function App() {
  const [message, setMessage] = useState('loading');
  const createRoom = useCallback(() => {
    fetch('http://localhost:3000/api/room', { method: 'POST' })
      .then((res) => res.json())
      .then(({ message }) => {
        setMessage(message);
      });
  }, []);

  useEffect(() => {
    const source = new EventSource('/sse');
    if (source)
      source.addEventListener('message', (message) => {
        setMessage(message.data);
        return message;
      });
  }, []);

  return (
    <h1>
      {message}
      <button onClick={() => createRoom()}>createRoom</button>
    </h1>
  );
}

export default App;
