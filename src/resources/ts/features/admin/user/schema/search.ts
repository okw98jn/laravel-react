import { requiredMessage, stringMaxMessage } from '@/utils/validation-message';
import { z } from 'zod';

const displayNames = {
  id: 'ID',
  name: '名前',
  email: 'メールアドレス',
};

export const searchSchema = z.object({
  id: z
    .string()
    .min(1, { message: requiredMessage(displayNames.id) })
    .max(255, { message: stringMaxMessage(displayNames.id, 255) }),
  name: z
    .string()
    .min(1, { message: requiredMessage(displayNames.name) })
    .max(255, { message: stringMaxMessage(displayNames.name, 255) }),
  email: z
    .string()
    .min(1, { message: requiredMessage(displayNames.email) })
    .max(255, { message: stringMaxMessage(displayNames.email, 255) }),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
