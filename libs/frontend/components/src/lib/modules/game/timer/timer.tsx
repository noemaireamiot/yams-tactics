import { CSSProperties } from 'react';
import styles from './timer.scss';
import {
  GameModel,
  getRoundDefinition,
  getRoundFromTime,
} from '@yams-tactics/domain';

interface TimerProps {
  className?: string;
  game: GameModel;
}

export function Timer({ className = '', game }: TimerProps) {
  const { left } = getRoundFromTime(
    (+new Date() - +new Date(game.startedAt)) / 1000
  );
  const round = getRoundDefinition(game.currentRound);

  const secondLeft = left < 0 ? Math.round(Math.abs(left)) : 0;
  const percentage = (secondLeft * 100) / round.time;

  // TODO revoir le timer surtout avec la synchro back
  return (
    <div
      className={`${className} ${styles['progress-bar']} shadow`}
      style={
        {
          '--percentage': `${percentage}%`,
          '--secondLeft': String(secondLeft),
        } as unknown as CSSProperties
      }
    />
  );
}
