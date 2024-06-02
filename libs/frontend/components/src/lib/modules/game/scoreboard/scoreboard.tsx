import { ScoreboardModel } from '@yams-tactics/domain';
import { useTranslation } from 'react-i18next';
import styles from './scoreboard.scss';

interface ScoreBoardProps {
  scoreboard: ScoreboardModel;
  className?: string;
}

export function ScoreBoard({ scoreboard, className = '' }: ScoreBoardProps) {
  const { t } = useTranslation();
  return (
    <div className={`${className} ${styles.scoreboard} shadow`}>
      <table>
        <tbody>
          {scoreboard.scores.map((score) => (
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
