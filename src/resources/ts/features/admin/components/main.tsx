import type React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function Main({ children }: Props) {
  return (
    <main className="peer-[.header-fixed]/header:mt-16 px-4 pb-2 space-y-4">
      {children}
    </main>
  );
}
