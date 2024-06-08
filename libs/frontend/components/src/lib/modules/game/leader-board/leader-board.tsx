import './leader-board.scss';
import { PlayerBoard } from '../player-board';
import { useGameContext } from '@yams-tactics/frontend-common';

interface LeaderBoardProps {
  className?: string;
}

export function LeaderBoard({ className = '' }: LeaderBoardProps) {
  const { game } = useGameContext();
  return (
    <div className={`${className}`}>
      <div className={`border-radius ${'leaderboardWrapper'}`}>
        {game?.players.map((player) => (
          <PlayerBoard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
