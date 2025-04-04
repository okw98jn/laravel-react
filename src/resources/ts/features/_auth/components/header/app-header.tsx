import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserDropdown } from '@/features/_auth/components/header/user-dropdown';
import { Bell } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex items-center justify-between md:justify-end bg-background p-4 pb-2 md:pb-0">
      <SidebarTrigger variant="outline" className="md:hidden" />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <UserDropdown />
      </div>
    </header>
  );
}
