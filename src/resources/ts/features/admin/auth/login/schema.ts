import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().max(255).email(),
  password: z.string().min(8).max(128),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
