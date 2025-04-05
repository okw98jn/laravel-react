import type { RowSelectionState, VisibilityState } from '@tanstack/react-table';
import { useState } from 'react';

export const useTableState = () => {
  // 行選択の状態を管理
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // 列の表示状態を管理
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  return {
    rowSelection,
    columnVisibility,
    setRowSelection,
    setColumnVisibility,
  };
};
