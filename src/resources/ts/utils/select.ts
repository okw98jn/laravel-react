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
 */
export function toSelectOptions(
  obj: Record<string, SelectOptionSource>,
): SelectOption[] {
  return Object.values(obj).map((item) => ({
    value: String(item.value), // セレクトボックスの value は文字列として扱うため変換
    label: item.label,
  }));
}

/**
 * セレクトオプションの配列から値の配列を抽出します
 */
export function toSelectValues(options: SelectOption[]): [string, ...string[]] {
  const values = options.map((option) => option.value);

  return values as [string, ...string[]];
}
