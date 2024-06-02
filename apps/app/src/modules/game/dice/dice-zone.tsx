import { useState } from 'react';
import styles from './dice-zone.scss';
import { Dice } from './components';
import {
  ActionTypeEnum,
  PlayerModel,
  computeDicesRoll,
} from '@yams-tactics/domain';
import { usePlayerActions } from '@yams-tactics/frontend-common';

export function DiceZone({ player }: { player: PlayerModel | null }) {
  const [dicesValue, setDicesValue] = useState<number[]>(
    player?.dices.map((dice) => dice.currentFace?.value ?? 1) || [1, 1, 1, 1, 1]
  );
  const { mutateAsync: playerActions } = usePlayerActions();
  const [isRotating, setIsRotating] = useState(false);

  const resetDice = () => {
    setDicesValue([]);
    setIsRotating(true);
  };
  return (
    <div className="w-full h-full">
      <button
        onClick={async () => {
          if (player) {
            await playerActions({ type: ActionTypeEnum.roll_dices });
            player.actions.push({ type: ActionTypeEnum.roll_dices });
            const face = computeDicesRoll(player);
            setDicesValue(player.dices.map((dice, i) => face[i].value));
          }
        }}
      >
        Launch dice
      </button>
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
