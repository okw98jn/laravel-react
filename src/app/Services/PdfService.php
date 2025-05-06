<?php

namespace App\Services;

use Barryvdh\DomPDF\PDF;
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;
use Illuminate\Support\Facades\Storage;

class PdfService
{
    /**
     * HTMLビューからPDFを生成
     *
     * @param string $view PDFのビューテンプレートパス
     * @param array<string, mixed> $data ビューに渡すデータ
     * @return PDF
     */
    public function generateFromView(string $view, array $data = []): PDF
    {
        return DomPdf::loadView($view, $data);
    }

    /**
     * PDFをストレージに保存
     *
     * @param PDF $pdf PDF
     * @param string $path 保存パス
     * @param string|null $disk ストレージディスク
     * @return string 保存されたファイルのパス
     */
    public function save(PDF $pdf, string $path, ?string $disk = null): string
    {
        if ($disk) {
            Storage::disk($disk)->put($path, $pdf->output());
        } else {
            Storage::put($path, $pdf->output());
        }

        return $path;
    }

    /**
     * エンティティに関連するPDFの保存パスを生成
     *
     * @param string $entityType エンティティタイプ（例: 'users', 'invoices'）
     * @param int|string $entityId エンティティID
     * @param string $fileName ファイル名
     * @return string
     */
    public function getStoragePath(string $entityType, int|string $entityId, string $fileName): string
    {
        return $entityType . '/' . $entityId . '/' . $fileName;
    }

    /**
     * PDFをビューから生成してストレージに保存
     *
     * @param string $view ビューパス
     * @param array<string, mixed> $data ビューデータ
     * @param string $path 保存パス
     * @param string|null $disk ストレージディスク
     * @return string 保存されたファイルのパス
     */
    public function generateAndSave(string $view, array $data, string $path, ?string $disk = null): string
    {
        $pdf = $this->generateFromView($view, $data);
        return $this->save($pdf, $path, $disk);
    }

    /**
     * PDFをストリーミングレスポンスとして出力
     *
     * @param PDF $pdf PDFインスタンス
     * @param string $fileName ファイル名
     * @return \Illuminate\Http\Response
     */
    public function stream(PDF $pdf, string $fileName): \Illuminate\Http\Response
    {
        return $pdf->stream($fileName);
    }

    /**
     * PDFをダウンロードレスポンスとして出力
     *
     * @param PDF $pdf PDFインスタンス
     * @param string $fileName ファイル名
     * @return \Illuminate\Http\Response
     */
    public function download(PDF $pdf, string $fileName): \Illuminate\Http\Response
    {
        return $pdf->download($fileName);
    }
}
