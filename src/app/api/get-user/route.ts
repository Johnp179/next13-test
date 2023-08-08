import { getToken } from "next-auth/jwt";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (token) {
    return NextResponse.json(token);
  }

  return NextResponse.json(null, {
    status: 401,
  });
}
