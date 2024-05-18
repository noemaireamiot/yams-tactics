import { useCallback, useEffect, useState } from 'react';
import Dice from './components/Dice/Dice';
import styles from './game.scss';

export function Game() {
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

  return (
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
  );
}

export default Game;
