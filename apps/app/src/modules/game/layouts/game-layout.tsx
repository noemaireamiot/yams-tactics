import { GameModel, PlayerModel } from '@yams-tactics/domain';
import {
  GameMetaData,
  LeaderBoard,
  ScoreBoard,
  Stuff,
  Timer,
} from '@yams-tactics/frontend-components';
import { PropsWithChildren } from 'react';
import styles from './game-layout.scss';

interface GameLayoutProps {
  game?: GameModel;
  currentPlayer?: PlayerModel;
}

export function GameLayout({
  children,
  currentPlayer,
}: PropsWithChildren<GameLayoutProps>) {
  return (
    <div className={`${styles.container} h-full`}>
      <GameMetaData className={styles.metadata} currentPlayer={currentPlayer} />
      <Timer className={styles.timer} />
      <ScoreBoard className={styles.scoreboard} />
      <LeaderBoard className={styles.leaderboard} />
      <div className={styles.content}>{children}</div>
      <Stuff className={styles.stuff} />
    </div>
  );
}
