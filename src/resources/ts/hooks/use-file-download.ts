import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { saveAs } from 'file-saver';

/**
 * Content-Disposition ヘッダーからファイル名を抜き出す関数
 */
function getFileNameFromContentDisposition(cd?: string) {
  const fallBackFileName = 'download.csv';

  if (!cd) return fallBackFileName;

  // 例: Content-Disposition: attachment; filename="xxxxx.csv"
  const match = cd.match(/filename\s*=\s*"([^"]+)"/i);
  if (match?.[1]) return match[1];

  // ダブルクォーテーションが無いパターンへのフォールバック
  const match2 = cd.match(/filename\s*=\s*([^;]+)/i);
  if (match2?.[1]) return match2[1].trim();

  return fallBackFileName;
}

/**
 * ファイルダウンロード用フック
 * API から Blob を取得し、Content-Disposition の filename で保存
 */
export function useFileDownload() {
  return useMutation({
    mutationFn: async (url: string) => {
      const response = await api.get<Blob>(url, { responseType: 'blob' });
      const cd = response.headers['content-disposition'];
      const fileName = getFileNameFromContentDisposition(cd);

      saveAs(response.data, fileName);
    },
  });
}
