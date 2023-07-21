import type { User } from "../api/route";
import { prisma } from "@/app/lib/dbConnect";
import ShowUsers from "./ShowUsers";
export const dynamic = "force-dynamic";

export default function Page() {
  return <ShowUsers />;
}
