import { useTranslation } from 'react-i18next';
import styles from './scoreboard.scss';
import { useGameContext } from '@yams-tactics/frontend-common';

interface ScoreBoardProps {
  className?: string;
}

export function ScoreBoard({ className = '' }: ScoreBoardProps) {
  const { t } = useTranslation();
  const { currentPlayer } = useGameContext();
  const scoreboard = currentPlayer?.scoreboard;

  return (
    <div className={`${className} ${styles.scoreboard} shadow`}>
      <table>
        <tbody>
          {(scoreboard?.scores ?? []).map((score) => (
            <tr key={score.id}>
              <td className={styles.rawName}>
                {t(`scoreboard.${score.type}`)}
              </td>
              <td>{score.done ? score.value || 0 : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
