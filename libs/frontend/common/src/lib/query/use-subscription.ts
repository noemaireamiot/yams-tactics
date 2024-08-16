import { useEffect, useRef } from 'react';

export const useSubscription = () => {
  const websocket = useRef<WebSocket>();

  useEffect(() => {
    if (!websocket.current) {
      websocket.current = new WebSocket(
        `${process.env.API_URL}:${process.env.API_WS_PORT}`
      );
      websocket.current.onopen = () => {
        console.log('connected');
      };

      websocket.current.addEventListener('message', (event) => {
        console.info(event.data);
      });
    }

    return () => {
      if (
        websocket.current &&
        websocket.current.readyState === WebSocket.OPEN
      ) {
        console.info('WS closed');
        websocket.current.close();
      }
    };
  }, []);

  return websocket.current;
};
