import type React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function Main({ children }: Props) {
  return (
    <main className="peer-[.header-fixed]/header:mt-16 px-4 py-2 space-y-2">
      {children}
    </main>
  );
}
