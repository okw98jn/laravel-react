import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type {
  NavGroup as NavGroupType,
  NavItem,
} from '@/features/_auth/types/sidebar';

import { Link, useMatchRoute } from '@tanstack/react-router';

export function NavGroup({ title, items }: NavGroupType) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          return <SidebarMenuLink key={key} item={item} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarMenuLink({ item }: { item: NavItem }) {
  const matchRoute = useMatchRoute();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={!!matchRoute({ to: item.url })}
        tooltip={item.title}
      >
        <Link to={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
