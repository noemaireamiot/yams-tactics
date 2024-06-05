import styles from './text-field.scss';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextField(props: TextFieldProps) {
  return (
    <label className={styles.textField}>
      {props.label && (
        <span className={styles.textField__label}>{props.label}</span>
      )}
      <input className={styles.textField__field} {...props} />
    </label>
  );
}
