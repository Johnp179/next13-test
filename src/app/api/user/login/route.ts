import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db-connect";
import { Prisma } from "@prisma/client";
import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const Validator = z.object({
  email: z.string(),
  password: z.string(),
});

export interface LoginError {
  email: boolean;
  password: boolean;
  attempts: boolean;
  timeTillReset: number;
}

const waitInterval = 1 * 60 * 1000; // 1 minute
const maxAttempts = 5;

async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return user;
}

export async function POST(req: NextRequest) {
  const error: LoginError = {
    email: false,
    password: false,
    attempts: false,
    timeTillReset: 0,
  };

  try {
    const body = await req.json();
    const { email: loginEmail, password } = Validator.parse(body);
    const user = await prisma.user.findFirst({
      where: {
        email: loginEmail,
      },
    });

    if (!user) {
      error.email = true;
      throw error;
    }
    const { id, name, email, startDate, loginAttempts } = user;
    const startTime = startDate.getTime();
    let updatedStartTime: number | undefined;
    let updatedLoginAttempts: number | undefined;
    if (Date.now() - startTime > waitInterval) {
      const user = await updateUser(id, {
        loginAttempts: 0,
        startDate: new Date(),
      });
      updatedStartTime = user.startDate.getTime();
      updatedLoginAttempts = user.loginAttempts;
    }

    error.timeTillReset =
      (waitInterval - (Date.now() - (updatedStartTime ?? startTime))) / 1000;

    if (updatedLoginAttempts ?? loginAttempts >= maxAttempts) {
      error.attempts = true;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      await updateUser(user.id, {
        loginAttempts: (updatedLoginAttempts ?? loginAttempts) + 1,
      });
      error.password = true;
      throw error;
    }

    return NextResponse.json({
      id,
      name,
      email,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(error, {
        status: 500,
      });
    }

    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }

    return NextResponse.json(error as LoginError, {
      status: 401,
    });
  }
}
