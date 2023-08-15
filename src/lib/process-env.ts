import { z } from "zod";

const Validator = z.object({
  DATABASE_URL: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  ENCRYPTION_KEY_BASE: z.string(),
  SALT: z.string(),
  IVBASE: z.string(),
});

const envVars = Validator.parse(process.env);
export default envVars;
