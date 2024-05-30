import { PlayerModel } from '@yams-tactics/domain';
import styles from './leaderboard.scss';
import { PlayerBoard } from '../playerboard';

interface LeaderBoardProps {
  leaderboard: PlayerModel[];
  className?: string;
}

export function LeaderBoard({ leaderboard, className = '' }: LeaderBoardProps) {
  return (
    <div className={`${className}`}>
      <div className={`border-radius ${styles.metadataWrapper}`}>
        {leaderboard.map((player) => (
          <PlayerBoard player={player} />
        ))}
      </div>
    </div>
  );
}
