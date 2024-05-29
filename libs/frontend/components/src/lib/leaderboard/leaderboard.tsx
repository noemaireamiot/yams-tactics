import styles from './leaderboard.scss';

interface LeaderBoardProps {
  className?: string;
}

export function LeaderBoard({ className }: LeaderBoardProps) {
  return (
    <div style={{ backgroundColor: 'red' }} className={`${className || ''}`}>
      leader board
    </div>
  );
}
