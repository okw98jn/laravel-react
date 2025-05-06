<?php

namespace App\UseCases\User;

use App\Dto\User\PreviewPdfDto;
use Barryvdh\DomPDF\Facade\Pdf;

class PreviewPdfUseCase
{
    /**
     * ユーザー情報のPDFプレビューを生成
     *
     * @param  PreviewPdfDto $dto
     * @return array{pdf: \Barryvdh\DomPDF\PDF, file_name: string}
     */
    public function handle(PreviewPdfDto $dto): array
    {
        $userData = [
            'name' => $dto->name,
            'email' => $dto->email,
        ];

        $pdf = Pdf::loadView('pdf.user_preview', ['user' => $userData]);

        return [
            'pdf' => $pdf,
            'file_name' => 'user_preview.pdf',
        ];
    }
}
