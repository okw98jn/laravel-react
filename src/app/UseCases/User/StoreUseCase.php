<?php

namespace App\UseCases\User;

use App\Dto\User\StoreDto;
use App\Facades\PdfGenerator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class StoreUseCase
{
    /**
     * ユーザーを登録する
     *
     * @param  StoreDto $dto ユーザー作成Dto
     * @return array{user: User, pdf_path: string}
     */
    public function handle(StoreDto $dto): array
    {
        $user = User::create([
            'name'     => $dto->name,
            'email'    => $dto->email,
            'gender'   => $dto->gender,
            'status'   => $dto->status,
            'memo'     => $dto->memo,
            'password' => Hash::make($dto->password),
        ]);

        // ユーザー情報のPDFを生成してストレージに保存
        $fileName = 'user_' . $user->id . '.pdf';
        $path = PdfGenerator::getStoragePath('users', $user->id, $fileName);

        $pdfPath = PdfGenerator::generateAndSave('pdf.user_preview', ['user' => $user], $path);

        return [
            'user' => $user,
            'pdf_path' => $pdfPath
        ];
    }
}
