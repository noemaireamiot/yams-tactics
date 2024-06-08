import { Router, useAuth } from '@yams-tactics/frontend-common';
import { Button, TextField } from '@yams-tactics/frontend-components';
import './auth.scss';
import { FormEventHandler } from 'react';

export function Register() {
  const { register } = useAuth();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name } = Object.fromEntries(
      formData as unknown as [['name', string]]
    );
    await register(name);
  };

  return (
    <div className={'container'}>
      <form onSubmit={onSubmit}>
        <TextField autoFocus name="name" label="Name" />
        <Button color="yellow" type="submit" className="btn-w-full">
          Register
        </Button>
      </form>
      <a href={Router.Login()}>Login</a>
    </div>
  );
}
