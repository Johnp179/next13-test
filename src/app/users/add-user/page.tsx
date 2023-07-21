"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

async function postRequest(url: string, postData: Record<string, any>) {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (resp.status === 404 || resp.status === 405 || resp.status === 500) {
    throw new Error(`Server responded with ${resp.status} code`);
  }

  return resp.json();
}

export default function Page() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    await postRequest("/users/api", {
      email: email.current?.value,
      password: password.current?.value,
    });
    router.refresh();
    setSuccess(true);
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form onSubmit={submit} className=" p-4 border-4 border-black">
        <label className="block">
          Email: <br />
          <input type="text" ref={email} />
        </label>
        <label className="block">
          Password: <br />
          <input type="text" ref={password} />
        </label>
        <button type="submit" className="block mx-auto py-3">
          Submit
        </button>
        {success && <div>User added</div>}
      </form>
    </main>
  );
}
