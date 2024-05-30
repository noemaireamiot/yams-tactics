import { PlayerModel } from '@yams-tactics/domain';
import styles from './playerboard.scss';

interface PlayerBoardProps {
  player: PlayerModel;
  className?: string;
}

export function PlayerBoard({ player, className = '' }: PlayerBoardProps) {
  return (
    <div className={`${className} ${styles.playerboardWrapper}`}>
      <div className={`${styles.scoreWrapper}`}>
        <img className={`${styles.avatar}`} src={player.user.avatar} />
        <span className={`${styles.score} font-M`}>
          {/* TODO calcutate score (or store it) */}43
        </span>
      </div>
      <div className="text-center">{player.user.name}</div>
    </div>
  );
}
