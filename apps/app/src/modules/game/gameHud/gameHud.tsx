import { GameModel, PlayerModel } from '@yams-tactics/domain';
import {
  GameMetaData,
  LeaderBoard,
  ScoreBoard,
  Stuff,
  Timer,
} from '@yams-tactics/frontend-components';
import { PropsWithChildren } from 'react';
import styles from './gameHud.scss';

interface GameHUDProps {
  game: GameModel;
  currentPlayer: PlayerModel;
}

export function GameHUD({
  children,
  game,
  currentPlayer,
}: PropsWithChildren<GameHUDProps>) {
  return (
    <div className={`${styles.container} h-full`}>
      <GameMetaData
        className={styles.metadata}
        game={game}
        currentPlayer={currentPlayer}
      />
      <Timer className={styles.timer} />
      <ScoreBoard className={styles.scoreboard} />
      <LeaderBoard className={styles.leaderboard} />
      <div className={styles.content}>{children}</div>
      <Stuff className={styles.stuff} />
    </div>
  );
}
