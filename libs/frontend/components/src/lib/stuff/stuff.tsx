import styles from './stuff.scss';

interface StuffProps {
  className?: string;
}

export function Stuff({ className }: StuffProps) {
  return (
    <div style={{ backgroundColor: 'green' }} className={`${className || ''}`}>
      stuff
    </div>
  );
}
