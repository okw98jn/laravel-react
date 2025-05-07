import { genderOptions } from '@/features/_auth/user/constants/gender';
import { statusOptions } from '@/features/_auth/user/constants/status';
import { toOptionValues } from '@/utils/options';
import { z } from 'zod';

// 画像ファイルの検証
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const createSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
  status: z.enum(toOptionValues(statusOptions)),
  gender: z.enum(toOptionValues(genderOptions)),
  memo: z.string().max(1000),
  items: z.array(
    z.object({
      name: z.string().min(1).max(255),
      memo: z.string().min(1).max(255),
    }),
  ),
  images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          'ファイルサイズは5MB以下である必要があります',
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          '有効な画像ファイル（jpg, png, webp）を選択してください',
        ),
    )
    .max(4, '画像は最大4枚までアップロードできます')
    .optional(),
});

export type CreateSchemaType = z.infer<typeof createSchema>;
