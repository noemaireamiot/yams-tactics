export function Login() {
  const onSubmit = () => {};

  return (
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input name="name"></input>
        <button type="submit">Login</button>
      </form>
  );
}
