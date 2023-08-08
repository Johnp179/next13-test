import { prisma } from "@/lib/db-connect";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export interface RegisterError {
  username: boolean;
  email: boolean;
}

const Validator = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const error: RegisterError = {
    username: false,
    email: false,
  };

  try {
    const body = Validator.parse(await req.json());
    const { username, email, password } = body;
    let user;
    user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) error.email = true;
    user = await prisma.user.findFirst({
      where: {
        name: username,
      },
    });
    if (user) error.username = true;
    if (error.username || error.email) {
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: username,
      email,
      password: hashedPassword,
    };
    await prisma.user.create({ data: newUser });
    return NextResponse.json("user created");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error, {
        status: 500,
      });
    }
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
    return NextResponse.json("User already exists", {
      status: 401,
    });
  }
}
