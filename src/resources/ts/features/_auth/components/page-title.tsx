interface Props {
  title: string;
}

export function PageTitle({ title }: Props) {
  return <h1 className="text-2xl font-bold tracking-tight">{title}</h1>;
}
