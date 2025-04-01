import { PAGE_INDEX, PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/constants/paginate';
import { sort, sortOptions } from '@/features/_auth/user/constants/sort';
import { statusOptions } from '@/features/_auth/user/constants/status';
import { toOptionValues } from '@/utils/options';
import { fallback } from '@tanstack/zod-adapter';
import { z } from 'zod';

export const defaultSearchParams = {
  id: '',
  name: '',
  email: '',
  status: [],
  sort: sort.id.value,
  pageIndex: PAGE_INDEX,
  pageSize: PAGE_SIZE,
};

export const searchSchema = z.object({
  id: fallback(z.string(), defaultSearchParams.id),
  name: fallback(z.string(), defaultSearchParams.name),
  email: fallback(z.string(), defaultSearchParams.email),
  status: fallback(
    z.array(z.enum(toOptionValues(statusOptions))),
    defaultSearchParams.status,
  ),
  sort: fallback(z.enum(toOptionValues(sortOptions)), defaultSearchParams.sort),
  pageIndex: fallback(
    z.number().min(PAGE_INDEX),
    defaultSearchParams.pageIndex,
  ),
  pageSize: fallback(
    z.number().refine((val) => PAGE_SIZE_OPTIONS.includes(val)),
    defaultSearchParams.pageSize,
  ),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
