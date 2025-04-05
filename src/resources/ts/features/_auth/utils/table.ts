import type { Table } from '@tanstack/react-table';

/**
 * テーブルから複数選択された行のIDを取得する関数
 *
 * @param table テーブルインスタンス
 * @returns 選択された行のID配列
 */
export function getSelectedIds<TData extends { id: number }>(
  table: Table<TData>,
): number[] {
  return table.getSelectedRowModel().rows.map((row) => row.original.id);
}
