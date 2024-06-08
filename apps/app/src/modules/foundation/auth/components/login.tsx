import { Router, useAuth } from '@yams-tactics/frontend-common';
import { TextField, Button } from '@yams-tactics/frontend-components';
import './auth.scss';
import { FormEventHandler } from 'react';

export function Login() {
  const { passwordLogin } = useAuth();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name } = Object.fromEntries(
      formData as unknown as [['name', string]]
    );
    await passwordLogin(name);
  };
  return (
    <div className="containerAuth">
      <form onSubmit={onSubmit}>
        <TextField autoFocus name="name" label="Name" />
        <Button color="yellow" type="submit" className="btn-w-full">
          Login
        </Button>
      </form>
      <a href={Router.Register()}>Register</a>
    </div>
  );
}
