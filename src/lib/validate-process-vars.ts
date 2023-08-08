import { z } from "zod";

const Validator = z.object({
  DATABASE_URL: z.string(),
  NEXTAUTH_URL: z.string(),
  SECRET: z.string(),
});

export default Validator;
