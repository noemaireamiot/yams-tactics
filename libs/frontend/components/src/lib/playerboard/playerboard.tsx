import { PlayerModel } from '@yams-tactics/domain';
import styles from './playerboard.scss';

interface PlayerBoardProps {
  player: PlayerModel;
  className?: string;
}

const defaultAvatar =
  'https://s22908.pcdn.co/wp-content/uploads/2022/02/what-are-bots.jpg';

export function PlayerBoard({ player, className = '' }: PlayerBoardProps) {
  return (
    <div className={`${className} ${styles.playerboardWrapper}`}>
      <div className={`${styles.scoreWrapper}`}>
        <img
          className={`${styles.avatar}`}
          src={player.user.avatar ?? defaultAvatar}
          alt={player.user.name}
        />
        <span className={`${styles.score} font-M`}>
          {/* TODO calcutate score (or store it) */}43
        </span>
      </div>
      <div className="text-center">{player.user.name}</div>
    </div>
  );
}
