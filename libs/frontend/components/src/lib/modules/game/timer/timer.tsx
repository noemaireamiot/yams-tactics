import { CSSProperties } from 'react';
import styles from './timer.scss';

interface TimerProps {
  percentage: number;
  className?: string;
}

export function Timer({ percentage, className = '' }: TimerProps) {
  // TODO revoir le timer surtout avec la synchro back
  return (
    <div
      className={`${className} ${styles['progress-bar']} shadow`}
      style={
        {
          '--percentage': `${percentage}%`,
          '--secondLeft': '43',
        } as unknown as CSSProperties
      }
    />
  );
}
