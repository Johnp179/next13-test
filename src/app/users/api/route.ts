import { prisma } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
  select: { email: true, password: true },
});

export type User = Prisma.UserGetPayload<Prisma.UserArgs>;

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return NextResponse.json<string>("User created");
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await prisma.user.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(`user with ${id} was deleted`);
}
