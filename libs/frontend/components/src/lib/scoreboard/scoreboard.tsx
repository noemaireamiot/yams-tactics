import styles from './scoreboard.scss';

interface ScoreBoardProps {
  className?: string;
}

export function ScoreBoard({ className }: ScoreBoardProps) {
  return (
    <div style={{ backgroundColor: 'white' }} className={`${className || ''}`}>
      scoreboard
    </div>
  );
}
