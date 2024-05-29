import styles from './timer.scss';

interface TimerProps {
  className?: string;
}

export function Timer({ className }: TimerProps) {
  return (
    <div style={{ backgroundColor: 'yellow' }} className={`${className || ''}`}>
      timer
    </div>
  );
}
