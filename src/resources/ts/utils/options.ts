export interface Option {
  value: string;
  label: string;
}

interface OptionSource {
  value: number | string;
  label: string;
  [key: string]: any;
}

/**
 * オブジェクト定数からoptions配列を生成します
 * (ラジオボタン、セレクトボックスなど共通で使用可能)
 */
export function toOptions(obj: Record<string, OptionSource>): Option[] {
  return Object.values(obj).map((item) => ({
    value: String(item.value), // value は文字列として扱うため変換
    label: item.label,
  }));
}

/**
 * オプションの配列から値の配列を抽出します
 */
export function toOptionValues(options: Option[]): [string, ...string[]] {
  const values = options.map((option) => option.value);

  return values as [string, ...string[]];
}
