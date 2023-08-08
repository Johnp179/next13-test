"use client";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

async function getSessionData() {
  const resp = await fetch("/api/get-user");
  const data = await resp.json();
  console.log(data);
}

function Authorized({ session }: { session: Session | null }) {
  return (
    <div>
      <h1>{`Logged in as ${session?.user?.name} with id ${session?.user.id}`}</h1>
      <button onClick={getSessionData}>Get session data</button>
    </div>
  );
}

export default function HomePage({ session }: { session: Session | null }) {
  return (
    <div>
      <nav className="flex justify-center items-center p-3 uppercase bg-stone-400 gap-3">
        {!session ? (
          <button onClick={() => signIn()}>Signin</button>
        ) : (
          <button onClick={() => signOut()}>Signout</button>
        )}
      </nav>
      <main className="flex min-h-screen items-center justify-center uppercase">
        {session ? <Authorized session={session} /> : "Unauthorized"}
      </main>
    </div>
  );
}
