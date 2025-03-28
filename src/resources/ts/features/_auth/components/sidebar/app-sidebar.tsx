import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroup } from '@/features/_auth/components/sidebar/nav-group';
import { NavHeader } from '@/features/_auth/components/sidebar/nav-header';
import { NavUser } from '@/features/_auth/components/sidebar/nav-user';
import type { NavGroup as NavGroupType } from '@/features/_auth/types/sidebar';
import { Home, User } from 'lucide-react';

const sidebarItems: NavGroupType[] = [
  {
    title: 'General',
    items: [
      {
        title: 'ダッシュボード',
        url: '/',
        icon: Home,
      },
      {
        title: 'ユーザー',
        url: '/user',
        icon: User,
      },
    ],
  },
  {
    title: 'Auth',
    items: [
      {
        title: '大カテゴリー',
        icon: Home,
        items: [
          {
            title: 'ユーザー',
            url: '/user',
          },
          {
            title: 'ダッシュボード',
            url: '/',
          },
        ],
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
        {sidebarItems.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
