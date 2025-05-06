<?php

namespace App\UseCases\User;

use App\Dto\User\PreviewPdfDto;
use App\Facades\PdfGenerator;

class PreviewPdfUseCase
{
    /**
     * ユーザー情報のPDFプレビューを生成
     *
     * @param  PreviewPdfDto $dto
     * @return array{pdf: \Barryvdh\DomPDF\PDF, fileName: string}
     */
    public function handle(PreviewPdfDto $dto): array
    {
        $userData = [
            'user' => [
                'name' => $dto->name,
                'email' => $dto->email,
            ]
        ];

        $pdf = PdfGenerator::generateFromView('pdf.user_preview', $userData);

        return [
            'pdf' => $pdf,
            'fileName' => 'user_preview.pdf',
        ];
    }
}
