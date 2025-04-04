import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroup } from '@/features/_auth/components/sidebar/nav-group';
import { NavHeader } from '@/features/_auth/components/sidebar/nav-header';
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
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
