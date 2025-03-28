import { z } from 'zod';

export const createSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  memo: z.string().max(1000),
  status: z.string().transform((val) => Number(val)),
  password: z.string().min(8).max(255),
});

export type CreateSchemaType = z.infer<typeof createSchema>;
