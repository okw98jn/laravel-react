import { fallback } from '@tanstack/zod-adapter';
import { z } from 'zod';

export const searchSchema = z.object({
  id: fallback(z.string(), ''),
  name: fallback(z.string(), ''),
  email: fallback(z.string(), ''),
  pageIndex: fallback(z.number(), 0),
  pageSize: fallback(z.number(), 10),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
