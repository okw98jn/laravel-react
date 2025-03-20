interface Props {
  children: React.ReactNode;
}

export function ListButtonContainer({ children }: Props) {
  return <div className="flex justify-end items-center gap-4">{children}</div>;
}
