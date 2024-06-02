import { useState } from 'react';
import styles from './dice-zone.scss';
import { Dice } from './components';
import { PlayerModel } from '@yams-tactics/domain';

export function DiceZone({ player }: { player: PlayerModel | null }) {
  const [dicesValue, setDicesValue] = useState<number[]>(
    player?.dices.map((dice) => dice.currentFace?.value ?? 1) || [1, 1, 1, 1, 1]
  );
  const [isRotating, setIsRotating] = useState(false);

  const resetDice = () => {
    setDicesValue([]);
    setIsRotating(true);
  };
  return (
    <div className="w-full h-full">
      <button onClick={() => {}}>Launch dice</button>
      <button onClick={resetDice}>Reset dice</button>
      <div className={styles.play}>
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
