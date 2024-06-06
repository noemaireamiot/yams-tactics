import { useEffect, useState } from 'react';
import styles from './dice-zone.scss';
import { Dice } from './components';
import {
  PlayerModel,
  actionDefinition,
  onRollDices,
} from '@yams-tactics/domain';
import { usePlayerActions } from '@yams-tactics/frontend-common';
import { Button } from '@yams-tactics/frontend-components';

export function DiceZone({ player }: { player: PlayerModel | null }) {
  const round = 'dice.1';
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

  const diceToBeRolled = (player?.dices ?? []).reduce<number[]>((acc, _, i) => {
    return lockedDices.includes(i) ? acc : [...acc, i];
  }, []);

  const onRollClick = async () => {
    if (statePlayer) {
      const action = actionDefinition.roll_dices(diceToBeRolled, round);
      await playerActions(action);

      onRollDices(
        { player: statePlayer, dices: diceToBeRolled, round },
        (player) => {
          setStatePlayer(player);
        }
      );

      setLockedDices([]);
    }
  };

  const { mutateAsync: playerActions } = usePlayerActions();

  return (
    <div className="w-full h-full">
      <Button color="blue" onClick={onRollClick}>
        Launch dice
      </Button>
      <div className={styles.play}>
        <div className={styles.dices}>
          {(statePlayer?.dices ?? []).map((dice, index) => (
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
