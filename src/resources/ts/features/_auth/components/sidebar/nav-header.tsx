import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';

export function NavHeader() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-between mt-2">
          {state === 'expanded' && (
            <Link to="/" className="flex items-center font-semibold ml-2">
              <span className="text-lg whitespace-nowrap">Laravel App</span>
            </Link>
          )}
          <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
