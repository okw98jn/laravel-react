import { z } from 'zod';
import zodMessages from '@/locales/ja/zod.json';
import attributes  from '@/locales/ja/attributes.json';


export const loginSchema = z.object({
  email: z.string().email({message:buildErrorMessage('invalid_string.regex', 'email')}).max(255),
  password: z.string().min(1).max(128),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

/** オブジェクトの深いパスを文字列ユニオン型として抽出する再帰型 */
type RecursiveKeyOf<T> =
  T extends object
    ? { [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${RecursiveKeyOf<T[K]>}`
          : `${K}`
        : never
      }[keyof T]
    : never;

/** zod.json の errors 以下のキー群 */
export type ZodTplKey = RecursiveKeyOf<typeof zodMessages['errors']>;

/** attributes.json のキー群 */
export type AttrKey = keyof typeof attributes;

/** ドット区切りのパスから値を取り出すユーティリティ */
function getByPath(obj: any, path: string): any {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/**
 * カラム名を取得するユーティリティ
 *
 * @param colKey attributes.json のキー
 * @returns カラム名
 */
export function getColumnName<C extends AttrKey>(colKey: C): string {
  return (attributes as Record<string, string>)[colKey] || colKey;
}

/** {{…}} を置き換えるユーティリティ */
function fmt(template: string, params: Record<string, any>): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) =>
    params[key] != null ? String(params[key]) : ''
  );
}

/**
 * 汎用エラーメッセージビルダー
 *
 * @param tplKey  zod.json の errors 以下のキー
 * @param colKey  attributes.json のキー
 * @param extras  {{minimum}} など追加パラメータ
 */
export function buildErrorMessage<
  T extends ZodTplKey,
  C extends AttrKey
>(
  tplKey: T,
  colKey: C,
  extras: Record<string, any> = {}
): string {
  const template = getByPath(zodMessages.errors, tplKey) as string;
  if (typeof template !== 'string') {
    console.warn(`[i18n] テンプレートが見つかりません: errors.${tplKey}`);
    return tplKey;
  }

  const columnName = getColumnName(colKey);
  return fmt(template, { path: columnName, ...extras });
}