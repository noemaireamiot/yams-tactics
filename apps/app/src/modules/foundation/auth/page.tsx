import { Login, Register } from './components';

export function UserPage() {
  return (
    <div>
      Login
      <Login />
      Or create an account
      <Register />
    </div>
  );
}
