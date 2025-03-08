import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1).max(255),
    email: z.string().max(255).email(),
    password: z.string().min(8).max(128),
    password_confirmation: z.string().min(8).max(128),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードが一致しません',
    path: ['password_confirmation'],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
