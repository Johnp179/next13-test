"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Sigin() {
  const [error, setError] = useState(false);
  const router = useRouter();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const resp = await signIn("credentials", {
      redirect: false,
      email: "johnoc1234@yahoo.com",
      password: "password",
    });

    if (resp?.error) {
      return setError(true);
    }
    router.push("/");
  }

  return (
    <form onSubmit={submit}>
      <label className="block">
        Email
        <input name="email" type="text" className="text-black" />
      </label>
      <label className="block my-5">
        Password
        <input name="password" type="password" className="text-black" />
      </label>
      <button type="submit">Sign in</button>
      <h1 className="font-bold text-red-700">
        {error && "Invalid email or password"}
      </h1>
    </form>
  );
}

// "username":"johnoc",
// "email":"johnoc1234@yahoo.com",
// "password":"password"
