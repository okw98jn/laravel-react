import {
  emailMessage,
  passwordConfirmationMessage,
  requiredMessage,
  stringMaxMessage,
  stringMinMessage,
} from '@/utils/validation-message';
import { z } from 'zod';

const displayNames = {
  name: '名前',
  email: 'メールアドレス',
  password: 'パスワード',
  password_confirmation: 'パスワード（確認）',
};

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: requiredMessage(displayNames.name) })
      .max(255, { message: stringMaxMessage(displayNames.name, 255) }),
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
    password_confirmation: z
      .string()
      .min(1, { message: requiredMessage(displayNames.password_confirmation) })
      .min(8, {
        message: stringMinMessage(displayNames.password_confirmation, 8),
      })
      .max(128, {
        message: stringMaxMessage(displayNames.password_confirmation, 128),
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: passwordConfirmationMessage(),
    path: ['password_confirmation'],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
