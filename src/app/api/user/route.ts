import { prisma } from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const Validator = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const { id, name, email, password } = Validator.parse(await req.json());

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
