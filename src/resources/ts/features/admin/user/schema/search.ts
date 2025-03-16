import { z } from 'zod';

export const searchSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
