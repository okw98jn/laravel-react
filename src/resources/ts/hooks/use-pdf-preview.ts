import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface PdfPreviewData {
  url: string;
  data: Record<string, any>;
}

/**
 * PDF生成・プレビュー用のカスタムフック
 * API から PDF の Blob を取得し、新しいウィンドウで表示
 */
export function usePdfPreview() {
  return useMutation({
    mutationFn: async ({ url, data }: PdfPreviewData) => {
      // PDFプレビューAPIを呼び出し
      const response = await api.post<Blob>(url, data, {
        responseType: 'blob',
      });

      // BlobからURLを作成
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = window.URL.createObjectURL(blob);

      // 新しいウィンドウでPDFを開く
      window.open(pdfUrl, '_blank');
    },
    onError: () => {
      toast.error('PDFプレビューの生成に失敗しました');
    },
  });
}
