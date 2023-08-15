import { prisma } from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";
import envVars from "@/lib/process-env";

const { scryptSync, createCipheriv, createDecipheriv } = require("crypto");
const algorithm = "aes-192-cbc";
const key = scryptSync(envVars.ENCRYPTION_KEY_BASE, envVars.SALT, 24); //key
const iv = scryptSync(envVars.IVBASE, envVars.SALT, 16); // Initialization vector.

export async function GET(_req: NextRequest) {
  try {
    let accounts = await prisma.account.findMany();
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
