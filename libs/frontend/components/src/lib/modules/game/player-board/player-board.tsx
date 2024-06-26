import { PlayerModel } from '@yams-tactics/domain';
import './player-board.scss';
import { UserCard } from '../../foundation';
import { Tooltip } from '../tooltip';

interface PlayerBoardProps {
  player: PlayerModel;
  className?: string;
}

export function PlayerBoard({ player }: PlayerBoardProps) {
  return (
    <div className={'playerBoard'}>
      <Tooltip content={<div>More user info</div>}>
        <UserCard
          user={player.user}
          score={player.scoreboard.scores.reduce(
            (acc, score) => acc + (score.value ?? 0),
            0
          )}
        />
      </Tooltip>
    </div>
  );
}
