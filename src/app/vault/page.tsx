import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db-connect";
import type { Account } from "@prisma/client";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

const accounts: Pick<Account, "name" | "password" | "id">[] = [
  {
    id: "1",
    name: "Facebook",
    password: "password",
  },
  {
    id: "2",
    name: "google",
    password: "someRandomPassword",
  },
  {
    id: "3",
    name: "github",
    password: "github",
  },
];

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.redirect("/");
  // }
  console.log("this the vault");
  const accounts = await prisma.account.findMany();

  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <h1 className="uppercase text-3xl font-bold">List of Accounts</h1>
      <ul>
        {accounts.map(({ id, name, password }) => (
          <li key={id}>
            <span>Account Name:{name}</span>
            <span>Account Password:{password}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
