import { Card as CardComponent, CardContent } from '@/components/ui/card';

interface Props {
  children: React.ReactNode;
}

export function Card({ children }: Props) {
  return (
    <CardComponent className="py-4 shadow-none">
      <CardContent>{children}</CardContent>
    </CardComponent>
  );
}
