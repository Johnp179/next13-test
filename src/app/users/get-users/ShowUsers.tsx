import { prisma } from "@/app/lib/dbConnect";
// export const dynamic = "force-dynamic";

export default async function ShowUsers() {
  const users = await prisma.user.findMany();
  console.log("i have been re-rendered");
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold uppercase">List of users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Email:{user.email}, password: {user.password}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
