import { genderOptions } from '@/features/_auth/user/constants/gender';
import { statusOptions } from '@/features/_auth/user/constants/status';
import { toOptionValues } from '@/utils/options';
import { z } from 'zod';

export const updateSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
  status: z.enum(toOptionValues(statusOptions)),
  gender: z.enum(toOptionValues(genderOptions)),
  memo: z.string().max(1000),
});

export type UpdateSchemaType = z.infer<typeof updateSchema>;
