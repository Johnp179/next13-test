import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db-connect";
import type { Account } from "@prisma/client";
import { getServerSession } from "next-auth";
import Vault from "@/components/vault";

export const dynamic = "force-dynamic";

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.redirect("/");
  // }

  const accounts = await prisma.account.findMany();

  return (
    <main className="flex min-h-screen justify-center items-center">
      <Vault accounts={accounts} />
    </main>
  );
}
