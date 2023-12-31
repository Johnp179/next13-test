import { prisma } from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import envVars from "@/lib/process-env";

const { scryptSync, createCipheriv, createDecipheriv } = require("crypto");
const algorithm = "aes-192-cbc";
const key = scryptSync(envVars.ENCRYPTION_KEY_BASE, envVars.SALT, 24); //key
const iv = scryptSync(envVars.IVBASE, envVars.SALT, 16); // Initialization vector.

const PostValidator = z.object({
  name: z.string(),
  password: z.string(),
});

const UpdateValidator = PostValidator.partial();

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;
    let accounts = await prisma.account.findMany({
      where: {
        userId: id,
      },
    });
    accounts = accounts.map((account) => {
      const decipher = createDecipheriv(algorithm, key, iv);
      let decryptedPassword = decipher.update(account.password, "hex", "utf8");
      decryptedPassword += decipher.final("utf8");
      return {
        ...account,
        password: decryptedPassword,
      };
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;
    const data = UpdateValidator.parse(await req.json());
    const user = await prisma.account.update({
      data,
      where: {
        id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(error, {
        status: 400,
      });
    }
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;
    const user = await prisma.account.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;
    const { name, password } = PostValidator.parse(await req.json());
    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedPassword = cipher.update(password, "utf8", "hex");
    encryptedPassword += cipher.final("hex");

    await prisma.account.create({
      data: {
        name,
        password: encryptedPassword,
        userId: id,
      },
    });
    return NextResponse.json("account added");
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(error, {
        status: 400,
      });
    }
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}
