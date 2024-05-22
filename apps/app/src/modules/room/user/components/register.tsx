import { Router, useRegister } from '@yams-tactics/frontend-common';
import { FormEventHandler } from 'react';

export function Register() {
  const { mutateAsync } = useRegister();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name } = Object.fromEntries(formData as any) as { name: string };
    const { token } = await mutateAsync({ name });
    localStorage.setItem(
      'token',
      token
    );

    Router.push('Game');

  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input name="name"></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
