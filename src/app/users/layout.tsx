import Link from "next/link";
import { ReactNode } from "react";

function Nav() {
  return (
    <nav className="flex items-center justify-center bg-blue-500">
      <Link
        href="/users/get-users"
        className="text-3xl font-bold p-4 hover:underline"
      >
        Show Users
      </Link>
      <Link
        href="/users/add-user"
        className="text-3xl font-bold p-4 hover:underline"
      >
        Add User
      </Link>
      <h1>{Math.random().toFixed(2)}</h1>
    </nav>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  console.log("i am the layout");
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
