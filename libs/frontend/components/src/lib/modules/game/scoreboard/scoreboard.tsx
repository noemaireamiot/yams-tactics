import { useTranslation } from 'react-i18next';
import './scoreboard.scss';
import { useGameContext } from '@yams-tactics/frontend-common';
import { scoreboardDefinitions } from '@yams-tactics/domain';

interface ScoreBoardProps {
  className?: string;
}

// @TODO - Add a context for those dice animation to be able to display loading state on precompute
export function ScoreBoard({ className = '' }: ScoreBoardProps) {
  const { t } = useTranslation();
  const { currentPlayer, game } = useGameContext();
  const scores = currentPlayer?.scoreboard.scores.map((score) => {
    return {
      ...score,
      value: scoreboardDefinitions[score.type].computeValue(
        currentPlayer.dices
      ),
    };
  });

  return (
    <div className={`bg-indigo-500 ${className} ${'scoreboard'} shadow`}>
      <table>
        <tbody>
          {(scores ?? []).map((score) => (
            <tr key={score.id}>
              <td className="rawName">
                {t(`scoreboard.${score.type}`)}
              </td>
              <td className="possible">
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
