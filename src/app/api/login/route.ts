import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db-connect";
import { Prisma } from "@prisma/client";
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
export const maxAttempts = 5;

async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

export async function GET(req: NextRequest) {
  const error: LoginError = {
    email: false,
    password: false,
    attempts: false,
    timeTillReset: 0,
  };
  const body = await req.json();

  try {
    const { email, password } = Validator.parse(body);
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      error.email = true;
      throw error;
    }

    const startTime = user.startDate.getTime();
    if (Date.now() - startTime > waitInterval) {
      await updateUser(user.id, { loginAttempts: 0, startDate: new Date() });
    }

    error.timeTillReset = (waitInterval - (Date.now() - startTime)) / 1000;

    if (user.loginAttempts >= maxAttempts) {
      error.attempts = true;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      user.loginAttempts++;
      await user.save();
      error.password = true;
      throw error;
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return res.status(500).end();
    }
    res.status(401).json({ error: error as LoginError });
  }
}
