import {
  emailMessage,
  requiredMessage,
  stringMaxMessage,
  stringMinMessage,
} from '@/utils/validation-message';
import { z } from 'zod';

const displayNames = {
  email: 'メールアドレス',
  password: 'パスワード',
};

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: requiredMessage(displayNames.email) })
    .max(255, { message: stringMaxMessage(displayNames.email, 255) })
    .email({ message: emailMessage() }),
  password: z
    .string()
    .min(1, { message: requiredMessage(displayNames.password) })
    .min(8, { message: stringMinMessage(displayNames.password, 8) })
    .max(128, { message: stringMaxMessage(displayNames.password, 128) }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
