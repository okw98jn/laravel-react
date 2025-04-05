import { SidebarTrigger } from '@/components/ui/sidebar';
import { BreadcrumbList } from '@/features/_auth/components/header/breadcrumb-list';
import { Notice } from '@/features/_auth/components/header/notice';
import { UserDropdown } from '@/features/_auth/components/header/user-dropdown';

export function AppHeader() {
  return (
    <header className="flex items-center justify-between bg-background p-4 pb-2 md:pb-0">
      <SidebarTrigger variant="outline" className="md:hidden" />
      <BreadcrumbList />
      <div className="flex items-center gap-2">
        <Notice />
        <UserDropdown />
      </div>
    </header>
  );
}
