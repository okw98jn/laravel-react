import { Header } from '@/features/_auth/components/header';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// SidebarProviderのモック
vi.mock('@/components/ui/sidebar', () => {
  return {
    SidebarTrigger: () => (
      <button type="button" data-testid="sidebar-trigger">
        SidebarTrigger
      </button>
    ),
    useSidebar: () => ({
      toggleSidebar: vi.fn(),
      state: 'expanded',
      open: true,
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      isMobile: false,
    }),
  };
});

describe('Header', () => {
  it('正しくレンダリングされること', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('サイドバートリガーがレンダリングされること', () => {
    render(<Header />);
    const trigger = screen.getByTestId('sidebar-trigger');
    expect(trigger).toBeInTheDocument();
  });

  it('childrenがレンダリングされること', () => {
    const testText = 'テストテキスト';
    render(
      <Header>
        <div data-testid="test-children">{testText}</div>
      </Header>,
    );

    const childElement = screen.getByTestId('test-children');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent(testText);
  });
});
