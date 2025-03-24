import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface Props {
  children?: React.ReactNode;
}

export function Header({ children }: Props) {
  return (
    <header className="flex h-16 items-center gap-3 bg-background p-4 sm:gap-4">
      <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
      <Separator orientation="vertical" className="h-6" />
      {children}
    </header>
  );
}
