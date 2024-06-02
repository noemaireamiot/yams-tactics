import { PlayerModel } from '@yams-tactics/domain';
import styles from './player-board.scss';
import { UserCard } from '../../foundation';

interface PlayerBoardProps {
  player: PlayerModel;
  className?: string;
}

export function PlayerBoard({ player }: PlayerBoardProps) {
  void styles;
  return <UserCard user={player.user} score={43} />;
}
