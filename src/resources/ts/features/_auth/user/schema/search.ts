import { statusOptions } from '@/features/_auth/user/constants/status';
import { toOptionValues } from '@/utils/options';
import { fallback } from '@tanstack/zod-adapter';
import { z } from 'zod';

export const searchSchema = z.object({
  id: fallback(z.string(), ''),
  name: fallback(z.string(), ''),
  email: fallback(z.string(), ''),
  status: fallback(z.array(z.enum(toOptionValues(statusOptions))), []),
  pageIndex: fallback(z.number(), 0),
  pageSize: fallback(z.number(), 10),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
