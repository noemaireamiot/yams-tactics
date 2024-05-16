import { useEffect, useState } from 'react';

export function App() {
  const [message, setMessage] = useState('loading');
  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((res) => res.json())
      .then(({ message }) => {
        setMessage(message);
      });
  }, []);
  useEffect(() => {
    const source = new EventSource('/sse');
    if (source)
      source.onmessage?.(((e: any) => {
        console.log(e.data);
        return e;
      }) as any);
  }, []);
  return <h1>{message}</h1>;
}

export default App;
