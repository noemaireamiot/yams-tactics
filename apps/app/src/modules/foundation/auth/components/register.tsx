import { Router, useAuth } from '@yams-tactics/frontend-common';
import { FormEventHandler } from 'react';

export function Register() {
  const { register } = useAuth();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name } = Object.fromEntries(formData as any) as { name: string };
    await register(name);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input autoFocus name="name"></input>
        <button type="submit">Register</button>
      </form>
      <a href={Router.Login()}>Login</a>
    </div>
  );
}
