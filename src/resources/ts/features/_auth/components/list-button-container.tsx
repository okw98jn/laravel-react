interface Props {
  children: React.ReactNode;
}

export function ListButtonContainer({ children }: Props) {
  return (
    <div className="flex flex-wrap justify-end items-center gap-4">
      {children}
    </div>
  );
}
