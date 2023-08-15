import { z } from "zod";

const dev = process.env.NODE_ENV !== "production";

const Validator = z.object({
  DATABASE_URL: z.string(),
  NEXTAUTH_URL: dev ? z.string().optional() : z.string(),
  NEXTAUTH_SECRET: z.string(),
  ENCRYPTION_KEY_BASE: z.string(),
  SALT: z.string(),
  IVBASE: z.string(),
});

const envVars = Validator.parse(process.env);
export default envVars;
