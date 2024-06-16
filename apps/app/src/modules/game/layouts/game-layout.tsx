import { GameModel, PlayerModel } from '@yams-tactics/domain';
import {
  GameMetaData,
  LeaderBoard,
  ScoreBoard,
  Stuff,
  Timer,
} from '@yams-tactics/frontend-components';
import { PropsWithChildren } from 'react';
import './game-layout.scss';

interface GameLayoutProps {
  game?: GameModel;
  currentPlayer?: PlayerModel;
}

export function GameLayout({
  children,
  currentPlayer,
}: PropsWithChildren<GameLayoutProps>) {
  return (
    <div className={`gameContainer h-full`}>
      <GameMetaData className="metadata" currentPlayer={currentPlayer} />
      <Timer className="timer" />
      <ScoreBoard className="scoreboard" />
      <LeaderBoard className="leaderboard" />
      <div className="content">{children}</div>
      <Stuff />
    </div>
  );
}
