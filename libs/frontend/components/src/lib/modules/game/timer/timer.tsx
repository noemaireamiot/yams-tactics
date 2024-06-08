import { CSSProperties, useEffect, useRef, useState } from 'react';
import './timer.scss';
import {
  Round,
  getRoundDefinition,
  getRoundFromTime,
} from '@yams-tactics/domain';
import { useGameContext } from '@yams-tactics/frontend-common';

const timeState = (game?: { currentRound: Round; startedAt: Date }) => {
  if (!game) return { percentage: 0, secondLeft: 0 };

  const { left } = getRoundFromTime(
    (+new Date() - +new Date(game.startedAt)) / 1000
  );
  const round = getRoundDefinition(game.currentRound);

  const secondLeft = left < 0 ? Math.abs(left) : 0;
  const percentage = (secondLeft * 100) / round.time;

  return {
    secondLeft,
    percentage,
  };
};

export function Timer({ className = '' }: { className?: string }) {
  const { isLoading, game } = useGameContext();
  const [{ percentage, secondLeft }, setTimeState] = useState(timeState(game));

  // Deduplicate useEffect
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    let interval = intervalRef.current;
    if (!interval) {
      interval = setInterval(() => {
        setTimeState(timeState(game));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        intervalRef.current = null;
      }
    };
  }, [game]);

  if (isLoading) return <div />;

  return (
    <div
      className={`${className} progress-bar shadow`}
      style={
        {
          '--percentage': `${percentage}%`,
          '--secondLeft': String(Math.round(secondLeft)),
        } as unknown as CSSProperties
      }
    />
  );
}
