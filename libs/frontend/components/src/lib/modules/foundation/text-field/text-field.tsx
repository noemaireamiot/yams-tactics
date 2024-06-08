import './text-field.scss';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextField(props: TextFieldProps) {
  return (
    <label className={'textField'}>
      {props.label && <span className={'textField__label'}>{props.label}</span>}
      <input className={'textField__field'} {...props} />
    </label>
  );
}
