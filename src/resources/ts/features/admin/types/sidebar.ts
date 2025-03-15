import type { LinkProps } from '@tanstack/react-router';

export interface NavItem {
  title: string;
  url: LinkProps['to'];
  icon?: React.ElementType;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
