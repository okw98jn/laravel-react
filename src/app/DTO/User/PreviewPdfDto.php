<?php

namespace App\Dto\User;

final class PreviewPdfDto
{
    /**
     * コンストラクタ
     *
     * @param string $name
     * @param string $email
     */
    public function __construct(
        public readonly string $name,
        public readonly string $email,
    ) {}

    /**
     * 配列からDTOを生成する
     *
     * @param  array<string, mixed> $data
     * @return static
     */
    public static function fromArray(array $data): static
    {
        return new static(
            name: (string) ($data['name'] ?? ''),
            email: (string) ($data['email'] ?? ''),
        );
    }
}
