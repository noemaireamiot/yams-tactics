import { useState } from 'react';
import './dice-zone.scss';
import { Dice } from './components';
import {
  DiceModel,
  ScoreModel,
  canRollDiceThisRound,
  canSubmitScoreThisRound,
} from '@yams-tactics/domain';
import { useGameContext } from '@yams-tactics/frontend-common';
import { Button } from '@yams-tactics/frontend-components';

export function DiceZone() {
  const {
    isLoading,
    game,
    currentPlayer,
    onRollDices: dispatchRollDices,
    onSubmitScore: dispatchSubmitScore,
  } = useGameContext();
  const round = game?.currentRound ?? 'dice.1';
  const [animation, setAnimation] = useState(false);

  const [lockedDices, setLockedDices] = useState<string[]>([]);
  const onDiceClick = (dice: DiceModel) => {
    setLockedDices((lockedDices) =>
      lockedDices.includes(dice.id)
        ? lockedDices.filter((d) => d === dice.id)
        : [...lockedDices, dice.id]
    );
  };
  const canRoleDice =
    currentPlayer && canRollDiceThisRound(currentPlayer, round);
  const canSubmitScore =
    currentPlayer && canSubmitScoreThisRound(currentPlayer, round);

  if (isLoading) {
    return null;
  }

  const onRollClick = async () => {
    const diceToBeRolled = (currentPlayer?.dices ?? []).reduce<DiceModel[]>(
      (acc, dice) => {
        return lockedDices.includes(dice.id) ? acc : [...acc, dice];
      },
      []
    );
    // @TODO - Add a context for those dice animation to be able to display loading state on precompute

    setAnimation(true);
    await dispatchRollDices({ dices: diceToBeRolled, round });
    setLockedDices([]);
    setAnimation(false);
  };

  const onSubmitScore = async (score?: ScoreModel) => {
    // to remove
    const s = currentPlayer.scoreboard.scores.find((score) => !score.done);
    const dices = currentPlayer?.dices ?? [];
    if (s) {
      await dispatchSubmitScore({ dices, round, score: s });
    }
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

      <Button
        onClick={() => onSubmitScore()}
        disabled={animation || !canSubmitScore}
      >
        Submit score
      </Button>
      <div className={'play'}>
        <div className={'dices'}>
          {(currentPlayer?.dices ?? []).map((dice) => (
            <Dice
              key={dice.id}
              value={dice.currentFace?.value}
              selected={lockedDices.includes(dice.id)}
              onClick={() => onDiceClick(dice)}
              rotating={!lockedDices.includes(dice.id) && animation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
