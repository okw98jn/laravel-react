export interface SelectOption {
  value: string;
  label: string;
}

interface SelectOptionSource {
  value: number | string;
  label: string;
  [key: string]: any;
}

/**
 * オブジェクト定数からセレクトボックス用のoptions配列を生成します
 *
 * セレクトボックスのvalueは文字列のみ受け付けるため、数値の場合は文字列に変換します。
 * 元のオブジェクトから `value` と `label` のみを抽出し、セレクトボックスで使用可能な形式に変換します。
 *
 * @example
 * // 以下のようなオブジェクト定数から
 * const status = {
 *   valid: { value: 2, label: '有効' },
 *   invalid: { value: 1, label: '無効' }
 * };
 *
 * // セレクトボックス用のoptions配列を生成
 * const options = toSelectOptions(status);
 * // 結果: [{ value: '2', label: '有効' }, { value: '1', label: '無効' }]
 *
 * @param obj - 変換対象のオブジェクト定数（各プロパティはSelectOptionSource形式である必要があります）
 * @returns セレクトボックスで使用可能なoptions配列
 */
export function toSelectOptions(
  obj: Record<string, SelectOptionSource>,
): SelectOption[] {
  return Object.values(obj).map((item) => ({
    value: String(item.value), // セレクトボックスの value は文字列として扱うため変換
    label: item.label,
  }));
}
