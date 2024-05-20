import { useCallback, useEffect, useState } from 'react';
import { Dice } from '../../components/Dice/dice';
import styles from './game.scss';

export function Game() {
  const [message, setMessage] = useState('loading');
  const [dicesValue, setDicesValue] = useState();
  const [isRotating, setIsRotating] = useState(true);

  const launchDice = () => {
    setDicesValue([
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
    ]);
    setIsRotating(false);
  };

  const resetDice = () => {
    setDicesValue(undefined);
    setIsRotating(true);
  };

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
      <div>
        <button onClick={launchDice}>Launch dice</button>
        <button onClick={resetDice}>Reset dice</button>
        <div className={styles.game}>
          <div className={styles.dices}>
            <Dice value={dicesValue?.[0]} rotating={isRotating} />
            <Dice value={dicesValue?.[1]} rotating={isRotating} />
            <Dice value={dicesValue?.[2]} rotating={isRotating} />
            <Dice value={dicesValue?.[3]} rotating={isRotating} />
            <Dice value={dicesValue?.[4]} rotating={isRotating} />
          </div>
        </div>
      </div>
      {message}
      <button onClick={() => createRoom()}>createRoom</button>
    </h1>
  );
}
