import './button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'yellow' | 'red' | 'blue' | 'brown';
}

export function Button({
  color = 'yellow',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`${props.className} btn ${`btn__${color}`}}`}
    >
      {props.children}
    </button>
  );
}
