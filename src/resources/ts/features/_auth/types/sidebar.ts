import type { LinkProps } from '@tanstack/react-router';

interface BaseNavItem {
  title: string;
  icon?: React.ElementType;
}

export interface NavLink extends BaseNavItem {
  url: LinkProps['to'];
  items?: never;
}

export interface NavCollapsible extends BaseNavItem {
  items: (BaseNavItem & { url: LinkProps['to'] })[];
  url?: never;
}

export type NavItem = NavLink | NavCollapsible;

export interface NavGroup {
  title: string;
  items: NavItem[];
}
