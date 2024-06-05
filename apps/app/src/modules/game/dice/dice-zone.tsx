import { useEffect, useState } from 'react';
import styles from './dice-zone.scss';
import { Dice } from './components';
import {
  PlayerModel,
  actionDefinition,
  onRollDices,
} from '@yams-tactics/domain';
import { usePlayerActions } from '@yams-tactics/frontend-common';

export function DiceZone({ player }: { player: PlayerModel | null }) {
  const [statePlayer, setStatePlayer] = useState(player);
  useEffect(() => {
    setStatePlayer(player);
  }, [player]);

  const [lockedDices, setLockedDices] = useState<number[]>([]);
  const onDiceClick = (index: number) => {
    setLockedDices((lockedDices) =>
      lockedDices.includes(index)
        ? lockedDices.filter((d) => d === index)
        : [...lockedDices, index]
    );
  };

  const onRollClick = async () => {
    if (statePlayer) {
      const action = actionDefinition.roll_dices(diceToBeRolled);
      await playerActions(action);

      onRollDices(statePlayer, diceToBeRolled, (player) => {
        setStatePlayer(player);
      });

      setLockedDices([]);
    }
  };

  const diceToBeRolled = (player?.dices ?? []).reduce<number[]>((acc, _, i) => {
    return lockedDices.includes(i) ? acc : [...acc, i];
  }, []);
  const { mutateAsync: playerActions } = usePlayerActions();
  const [isRotating, setIsRotating] = useState(false);

  const resetDice = () => {
    setIsRotating(true);
  };
  return (
    <div className="w-full h-full">
      <button onClick={onRollClick}>Launch dice</button>
      <button onClick={resetDice}>Reset dice</button>
      <div className={styles.play}>
        <div className={styles.dices}>
          {(statePlayer?.dices ?? []).map((dice, index) => (
            <Dice
              key={dice.id}
              value={dice.currentFace?.value}
              selected={lockedDices.includes(index)}
              onClick={() => onDiceClick(index)}
              rotating={isRotating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
