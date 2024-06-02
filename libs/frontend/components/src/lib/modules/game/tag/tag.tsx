import styles from './tag.scss';

interface TagProps {
  label: string;
  size?: 'S' | 'M' | 'L' | 'XL';
  className?: string;
}

export function Tag({ label, size = 'M', className = '' }: TagProps) {
  return (
    <span className={`${className} border-radius font-${size} ${styles.tag}`}>
      {label}
    </span>
  );
}
