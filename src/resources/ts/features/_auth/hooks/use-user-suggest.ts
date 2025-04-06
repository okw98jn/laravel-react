import { useSuggestUsers } from '@/features/_auth/user/api/suggest-users';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useUserSuggest = (debounceDelay = 400) => {
  const [keyword, setKeyword] = useState<string>('');

  const [debouncedKeyword] = useDebounce(keyword, debounceDelay);

  // API呼び出し用フック
  const { data, isPending, isError } = useSuggestUsers(debouncedKeyword);

  return {
    setKeyword,
    options: data?.data.results ?? [],
    isPending,
    isError,
  };
};
