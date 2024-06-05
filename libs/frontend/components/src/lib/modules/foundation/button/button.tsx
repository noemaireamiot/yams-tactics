import styles from './button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'yellow' | 'red' | 'blue' | 'brown';
}

export function Button({ color = 'yellow', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${props.className} ${styles.btn} ${styles[`btn__${color}`]}`}
    >
      {props.children}
    </button>
  );
}
