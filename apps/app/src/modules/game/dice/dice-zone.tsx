import { useState } from 'react';
import styles from './dice-zone.scss';
import { Dice } from './components';
import { canRollDiceThisRound } from '@yams-tactics/domain';
import { useGameContext } from '@yams-tactics/frontend-common';
import { Button } from '@yams-tactics/frontend-components';

export function DiceZone() {
  const {
    isLoading,
    game,
    currentPlayer,
    onRollDices: dispatchRollDices,
  } = useGameContext();
  const round = game?.currentRound ?? 'dice.1';
  const [animation, setAnimation] = useState(false);

  const [lockedDices, setLockedDices] = useState<number[]>([]);
  const onDiceClick = (index: number) => {
    setLockedDices((lockedDices) =>
      lockedDices.includes(index)
        ? lockedDices.filter((d) => d === index)
        : [...lockedDices, index]
    );
  };
  const canRoleDice =
    currentPlayer && canRollDiceThisRound(currentPlayer, round);

  if (isLoading) {
    return null;
  }

  const onRollClick = async () => {
    const diceToBeRolled = (currentPlayer?.dices ?? []).reduce<number[]>(
      (acc, _, i) => {
        return lockedDices.includes(i) ? acc : [...acc, i];
      },
      []
    );
    setAnimation(true);
    await dispatchRollDices(diceToBeRolled, round);
    setLockedDices([]);
    setTimeout(() => {
      setAnimation(false);
    }, 1000);
  };

  return (
    <div className="w-full h-full">
      <Button
        color="blue"
        disabled={!canRoleDice || animation}
        onClick={onRollClick}
      >
        Launch dice
      </Button>
      <div className={styles.play}>
        <div className={styles.dices}>
          {(currentPlayer?.dices ?? []).map((dice, index) => (
            <Dice
              key={dice.id}
              value={dice.currentFace?.value}
              selected={lockedDices.includes(index)}
              onClick={() => onDiceClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
