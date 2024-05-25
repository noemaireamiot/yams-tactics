import { Router, useAuth } from '@yams-tactics/frontend-common';
import { FormEventHandler } from 'react';

export function Login() {
  const { passwordLogin } = useAuth();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name } = Object.fromEntries(formData as any) as { name: string };
    await passwordLogin(name);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input autoFocus name="name"></input>
        <button type="submit">Login</button>
      </form>
      <a href={Router.Register()}>Register</a>
    </div>
  );
}
