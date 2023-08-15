export default function Dummy() {
  return (
    <form method="post" action="/api/test">
      <label className="block">
        Username
        <input name="email" type="text" className="text-black" />
      </label>
      <label className="block my-5">
        Password
        <input name="password" type="password" className="text-black" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}
