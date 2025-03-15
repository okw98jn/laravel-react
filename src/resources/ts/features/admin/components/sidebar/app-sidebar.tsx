import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroup } from '@/features/admin/components/sidebar/nav-group';
import { NavHeader } from '@/features/admin/components/sidebar/nav-header';
import { NavUser } from '@/features/admin/components/sidebar/nav-user';
import type { NavGroup as NavGroupType } from '@/features/admin/types/sidebar';
import { Home } from 'lucide-react';

const sidebarItems: NavGroupType[] = [
  {
    title: 'General',
    items: [
      {
        title: 'ダッシュボード',
        url: '/admin',
        icon: Home,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((item) => (
          <NavGroup key={item.title} title={item.title} items={item.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          name="John Doe"
          email="john.doe@example.com"
          avatar="https://github.com/shadcn.png"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
