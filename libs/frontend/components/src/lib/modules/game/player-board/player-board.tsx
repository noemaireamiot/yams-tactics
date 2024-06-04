import { PlayerModel } from '@yams-tactics/domain';
import styles from './player-board.scss';
import { UserCard } from '../../foundation';
import { Tooltip } from '../tooltip';

interface PlayerBoardProps {
  player: PlayerModel;
  className?: string;
}

export function PlayerBoard({ player }: PlayerBoardProps) {
  void styles;

  return (
    <div className={styles.playerBoard}>
      <Tooltip content={<div>More user info</div>}>
        <UserCard user={player.user} score={0} />
      </Tooltip>
    </div>
  );
}
