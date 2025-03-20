import { z } from 'zod';

export const createSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
});

export type CreateSchemaType = z.infer<typeof createSchema>;
