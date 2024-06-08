import { useTranslation } from 'react-i18next';
import './scoreboard.scss';
import { cls, useGameContext } from '@yams-tactics/frontend-common';
import {
  ScoreModel,
  canSubmitScoreThisRound,
  scoreboardDefinitions,
} from '@yams-tactics/domain';

interface ScoreBoardProps {
  className?: string;
}

// @TODO - Add a context for those dice animation to be able to display loading state on precompute
export function ScoreBoard({ className = '' }: ScoreBoardProps) {
  const { t } = useTranslation();
  const {
    currentPlayer,
    game,
    onSubmitScore: dispatchSubmitScore,
  } = useGameContext();
  const canSubmitScore =
    !!currentPlayer &&
    !!game.currentRound &&
    canSubmitScoreThisRound(currentPlayer, game.currentRound);

  const scores = currentPlayer?.scoreboard.scores.map((score) => {
    return {
      ...score,
      value: score.done
        ? score.value
        : scoreboardDefinitions[score.type].computeValue(currentPlayer.dices),
    };
  });

  if (!game) return null;

  const onSubmitScore = async (score: ScoreModel) => {
    const dices = currentPlayer?.dices ?? [];
    await dispatchSubmitScore({ dices, round: game?.currentRound, score });
  };

  return (
    <div className={`${className} ${'scoreboard'} shadow`}>
      <table>
        <tbody>
          {(scores ?? []).map((score) => (
            <tr
              key={score.id}
              onClick={() => canSubmitScore && onSubmitScore(score)}
            >
              <td className="rawName">{t(`scoreboard.${score.type}`)}</td>
              <td className={cls(!score.done && 'possible')}>
                {game?.currentRound.startsWith('shop')
                  ? score.done
                    ? score.value
                    : ''
                  : score.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
