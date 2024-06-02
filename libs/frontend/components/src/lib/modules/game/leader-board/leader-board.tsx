import { PlayerModel } from '@yams-tactics/domain';
import styles from './leader-board.scss';
import { PlayerBoard } from '../player-board';

interface LeaderBoardProps {
  leaderboard: PlayerModel[];
  className?: string;
}

export function LeaderBoard({ leaderboard, className = '' }: LeaderBoardProps) {
  return (
    <div className={`${className}`}>
      <div className={`border-radius ${styles.metadataWrapper}`}>
        {leaderboard.map((player) => (
          <PlayerBoard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
